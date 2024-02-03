import Link from "next/link";

interface PaginationBarProps {
  currenPage: number;
  totalPages: number;
}
export default function PaginationBar(
  {currenPage, totalPages}:PaginationBarProps
) {
  const maxPage = Math.min(totalPages, Math.max(currenPage + 4), 10);
  const minPage = Math.max(1, Math.min(currenPage - 5, maxPage - 9));

  const numeredPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numeredPageItems.push(
      <Link
        href={`?page=${page}`}
        key={page}
        className={`join-item btn ${currenPage === page ? "btn-active pointer-events-none" : ""}`}
      >
        {page}
      </Link>
    );
  }

  return (
    <>
    <section className="join hidden sm:block">
      {numeredPageItems}
    </section>
    <section className="join block sm:hidden">
      {currenPage > 1 &&
        <Link
          href={`?page=${currenPage - 1}`}
          className="btn join-item">«</Link>}
      <button className="join-item btn pointer-events-none">
        Page {currenPage}
      </button>
      {currenPage < totalPages &&
        <Link
        href={`?page=${currenPage + 1}`}
        className="btn join-item">»</Link>
       }
    </section>
    </>
  );
}
