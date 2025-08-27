import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm, // Este metodo de prisma ayuda a buscar por lo que contiene o lo que se parece en lo que producto tiene
                mode: 'insensitive' // No importa si esta en mayusculas o minusculas, lo habilitamos
            }
        },
        include: { // hacemos un tipo (populate) a las categorias apra tambien traerla
            category: true
        }
        
    })
    return products
}

export default async function SearchPage({searchParams}:{searchParams: {search: string}}) {

    // Instanciamos los params 
    const params = await searchParams
    const products = await searchProducts(params.search)

    return (
        <>
            <Heading>Resultados de busqueda: {params.search}</Heading>
            <div className='flex flex-col gap-5 lg:flex-row lg:justify-between'>
                <Link
                href={'/admin/products/new'}
                className='bg-amber-400 hover:bg-amber-300 transition w-full lg:w-auto text-xl px-10 py-3 text-center font-bold'
                >Crear Producto</Link>

                <ProductSearchForm />
            </div>

            {products.length ? (
                <ProductTable 
                    products={products}
                />
            ) : (
                <p className="text-center text-lg">No hay resultados</p>
            )}
        </>
    )
}