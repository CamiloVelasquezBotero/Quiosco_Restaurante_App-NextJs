import Link from "next/link";

type ProductsPaginationProps = {
    page: number,
    totalPages: number
}

export default function ProductsPagination({page, totalPages}:ProductsPaginationProps) {
  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  return (
    <nav className="flex justify-center py-10 gap-5">
      {page > 1 && (
        <Link
              href={`/admin/products?page=${page - 1}`}
              className="bg-white hover:bg-slate-200 transition px-4 py-2 text-lg text-gray-900 rounded-md ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-off"
        >&laquo;</Link>
      )}

      {pages.map(currentPage => (
        <Link
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
          className={`${page === currentPage ? 'font-black bg-slate-300' : 'bg-white'} hover:bg-slate-200 rounded-md transition px-4 py-2 text-lg text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-off`}

        >{currentPage}</Link>
      ))}

      {page < totalPages && (
        <Link
            href={`/admin/products?page=${page + 1}`}
            className="bg-white hover:bg-slate-200 transition px-4 py-2 text-lg text-gray-900 rounded-md ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-off"
        >&raquo;</Link>
      )}
    </nav>
  )
}
