'use client' // Para poder usar Toast 
import { searchSchema } from '@/src/schemaZod'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'
//import { useRouter } from 'next/navigation' //-Alternativa a (redirect), solo se usa en el cliente hacendo un router.push('url')

export default function ProductSearchForm() {
    //const router = useRouter()

    const handleSearchForm = (formData:FormData) => {
        // Creamos los datos para pasarselos al schema de zod
        const data = {
            search: formData.get('search')
        }

        // Validamos con ZOD
        const result = searchSchema.safeParse(data)
        if(!result.success) { // Si no se valida
            result.error.issues.map(issue => { // Por cada error mostramos el toast de error
                toast.error(issue.message) 
            })
            return
        }

        // Pasamos la validacion
        redirect(`/admin/products/search?search=${result.data.search}`)
        // router.push('url')
    }

  return (
    <form 
        action={handleSearchForm}
        className="flex items-center "
    >
        <input 
            type="text" 
            placeholder='Buscar Producto'
            className='p-2 placeholder-gray-400 bg-white w-full'
            name='search'
        />

        <input
            type='submit'
            className='bg-indigo-600 hover:bg-indigo-500 transition p-2 uppercase text-white cursor-pointer'
            value={'Buscar'}
        />
    </form>
  )
}
