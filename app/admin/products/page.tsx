import { redirect } from 'next/navigation'
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';

// Contamos que cantidad hay para preparar la paginacion
async function productCount() {
  return await prisma.product.count()
}

// Obtenemos todos los productos
async function getProducts(page:number, pageSize:number) {
  const skip = (page - 1) * pageSize

  const products = await prisma.product.findMany({
    take: pageSize, // Nos traemos unicamente un limite de 10 registros
    skip: skip, // Con esta llave podermos decirle saltarnos cuantos queramos para ir paginando
    include: {
      category: true // Incluimos en la busqueda que haga un tipo (populate como en mongo) y se traiga la categoria
    }
  })
  return products
}

// Creamos un type que hace que TS haga todo el trabajo pesado por nosotros y depende a lo que obtiene construye el type
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}:{searchParams: Promise<{page: string}>}) {

  const params = await searchParams // Desde la version 14.2, (searchParams) ya no es un objeto plano y hay que instanciarlo primero con await ya que funciona por streming
  const page = +params.page || 1 // Si no tenemos Query, entonces desde la pagina 1
  const pageSize = 10

  if(page < 0 ) { // Comprobamos antes de las consultas por si alguien llega a poner (?page=-100)
    redirect('/admin/products')
  }
  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  const totalPages = Math.ceil(totalProducts / pageSize) // Redondeamos hacia arriba
  
  if(page > totalPages) {
    redirect('/admin/products')
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className='flex flex-col gap-5 lg:flex-row lg:justify-between'>
        <Link
          href={'/admin/products/new'}
          className='bg-amber-400 hover:bg-amber-300 transition w-full lg:w-auto text-xl px-10 py-3 text-center font-bold'
        >Crear Producto</Link>

        <ProductSearchForm />
      </div>

      <ProductTable 
        products={products}
      />

      <ProductsPagination 
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
