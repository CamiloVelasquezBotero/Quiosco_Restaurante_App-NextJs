import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id:number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if(!product) { // En dado caso de que se le pase un id no valido
    //  redirect('/404')
        notFound() // Next ya tiene un compontente para esto para redireccionar al 404
    }

    return product
}

export default async function EditProductsPage({params}:{params: Promise<{id: string}>}) {
    const { id } = await params // Lo hacemos ocon await por qur next funciona por streaming 
    const product = await getProductById(+id) // Le pasamos el id como number por el modelo del Schema

  return (
    <>
        <Heading>Editar Producto: {product.name}</Heading>

        <GoBackButton />

        <EditProductForm>
            <ProductForm 
                product={product}
            /> {/* Como esta aprte se ejecuta en el cliente por el action entonces lo pasamos como children */}
        </EditProductForm>
    </>
  )
}
