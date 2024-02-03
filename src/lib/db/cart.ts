import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } }
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>;

export type ShoppingCart = CartWithProducts & {
  size: number,
  subtotal: number
}

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);
  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { user_id: Number(session.user.id) },
      include: { items: { include: { product: true } } }
    });
  } else {
    const localCartId = cookies().get("localCardId")?.value;
    cart = localCartId ?
      await prisma.cart.findUnique({
        where: { id: Number(localCartId) },
        include: { items: { include: { product: true } } }
      })
      : null;
  }

  if (!cart) return null;
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  }
}

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);
  let newCart: Cart;
  if (session) {
    newCart = await prisma.cart.create({
      data: {user_id: Number(session.user.id)}
    });
  } else {
    newCart = await prisma.cart.create({
      data: {}
    });
    cookies().set("localCardId", String(newCart.id));
  }


  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0
  }
}

export async function mergeAnonymousCartIntoUserCart(userId: string) {
  const localCartId = cookies().get("localCardId")?.value;
  const localCart = localCartId ?
      await prisma.cart.findUnique({
        where: { id: Number(localCartId) },
        include: { items: true }
      })
      : null;
  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: { id: Number(userId) },
    include: { items: true }
  })

  await prisma.$transaction(async tx => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);
      await tx.cartItem.deleteMany({
        where: {card_id: userCart.id}
      });
      await prisma.cart.update({ where: { id: userCart.id }, data: { items: { createMany: { data: mergedCartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity })) }} }});
      // await tx.cartItem.createMany({data: mergedCartItems.map(item => ({card_id: userCart.id,product_id: item.product_id,quantity: item.quantity}))})

    } else {
      await tx.cart.create({
        data: {
          user_id: Number(userId),
          items: {
            createMany: {
              data : localCart.items.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity
              }))
            }
          }
        }
      })
    }

    await tx.cart.delete({
      where: {
        id: localCart.id
      }
    });

    cookies().set("localCardId", "");
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        acc.push(item)
      }
    });
    return acc;
  }, [] as CartItem[]);
}
