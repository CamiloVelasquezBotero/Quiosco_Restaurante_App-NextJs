"use client"
import useSWR from 'swr' // Libreria para mantener actualizado contantenemente
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/src/types'

export default function page() {
  const url = '/admin/orders/api'
  // Creamos el fetcher para pasarselo a SWR
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  // El SWR toma 3 argumentos, el primero es el key(url), segundo(fetcher), tercero(objeto con opciones)
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 1000, // Para poder habilitar el refresco, le colocamos el interval de 1000, equivalente a 1 segundo
    revalidateOnFocus: false // Cada vez que volvamos a la pagina hara una revalidacion, para evitar esta petificones le colocamos false
  })

  if(isLoading) return <p>Cargando...</p>

  if(data) return ( // Si tenemos datos retornamos la renderizacion
    <>
        <Heading>Administrar Ordenes</Heading>

        {data.length ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
            {data.map(order => (
              <OrderCard 
                key={order.id}
                order={order}
              />
            ))}
          </div>
        ) : <p className="text-center">No hay ordenes pendientes</p>}
    </>
  )
}
