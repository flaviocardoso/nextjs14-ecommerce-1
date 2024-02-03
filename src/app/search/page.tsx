import ProductCart from "@/components/ProductCart";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string }
}

export function generateMetadata(
  {searchParams: { query }}: SearchPageProps
): Metadata {
  return ({
    title: `Search: ${query} - Flowmazon`
  });
}

export default async function SearchPage(
  {searchParams: { query }}: SearchPageProps
) {
  const produts = await prisma.product.findMany({
    where: {
      OR: [
        {name: { contains: query, /** mode: "insenvite" */ }}, // modo insensitivo é default no mysql e não aparece no typescript
        {description: { contains: query, /** mode: "insenvite" */ }}, // modo insensitivo é default no mysql e não aparece no typescript
      ]
    },
    orderBy: { id: "desc" }
  });

  if (produts.length === 0) {
    return (<div className="text-center">No products found!</div>);
  }

  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {produts.map(product => (
        <ProductCart product={product} key={product.id} />
      ))}
    </div>
  );
}
