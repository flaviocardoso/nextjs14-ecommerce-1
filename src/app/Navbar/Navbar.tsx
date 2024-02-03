import Image from "next/image";
import Link from "next/link";
import logo from "@/asserts/logo.png";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  const searchProducts = (formData: FormData) => {
    "use service";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
      redirect(`/search?query=${searchQuery}`)
    }
  }
  const cart = await getCart();

  return (
    <section className="bg-base-100">
      <nav className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-xl normal-case"
          >
            <Image
              src={logo}
              alt="Flowmazon logo"
              width={40}
              height={40}
            />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={`search`}>
            <div className="form-control">
              <input
                name="query"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </nav>
    </section>
  );
}
