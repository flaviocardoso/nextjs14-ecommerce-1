import { PrismaClient } from "@prisma/client";

const globalForPrima = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

const prismaBase = globalForPrima.prisma ?? new PrismaClient();

export const prisma = prismaBase.$extends({
  query: {
    cart: {
      async update({ args, query }) {
        args.data = { ...args.data, updateAt: new Date()};
        return query(args);
      }
    }
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrima.prisma = prismaBase;
