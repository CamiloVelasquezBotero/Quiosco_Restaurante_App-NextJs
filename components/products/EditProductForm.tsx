"use client"
import { productSchema } from "@/src/schemaZod";
import { toast } from "react-toastify";
import { createProduct } from "@/actions/create-product-action";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/update-product-action";
import { useParams } from 'next/navigation'

export default function EditProductForm({children}:{children: React.ReactNode}) {
    const router = useRouter() // Como estamos en el cliente usamos (useRouter) y en ves de (redirect) que es solo para el servidor
    const params = useParams()
    const id = +params.id!
    
    const handleSubmit = async (formData:FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image') // Obtenemos la imagen del input oculto que le pasamos 
        }
        
        const result = productSchema.safeParse(data) // Validamos en el cliente
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        // Validamos tambien en el servidor, junto con la accion de crear el producto y retornamos el resultado
        const response = await updateProduct(result.data, id) 
        if(response?.errors) { // Si hay errores
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        // Retroalimentamos al usuario si se creo correctamente
        toast.success('Producto Actualizado Correctamente')
        router.push('/admin/products')
    }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form 
            action={handleSubmit}
            className="space-y-5"
        >

            {children} {/* Pasamos <ProductForm />  como children para que no genere error en este componente de cliente*/}
            {/* <ProductForm />*/} {/* Este componente es del cliente lo cual generaria un error, entonces lo pasamos como children */} 

            <input
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 transition text-white w-full mt-5  p-3 uppercase font-bold cursor-pointer"
                value={'Guardar Cambios'}
            />
        </form>
    </div>
  )
}
