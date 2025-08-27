'use client'
import useSWR from 'swr'
import Logo from '@/components/ui/Logo'
import React from 'react'
import { OrderWithProducts } from '@/src/types'
import path from 'path'
import LatestOrderItem from '@/components/order/LatestOrderItem'

export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 1000, // Refescamos cada segundo
        revalidateOnFocus: false
    })

    if (isLoading) return <p>Cargando...</p>

    if (data) return (
        <>
            <div className='flex items-center'>
                <div className='flex jusitfy-start mx-10'>
                    <Logo />
                </div>
                <h1 className='text-6xl font-black ml-50 mt-10'>Ordenes Listas</h1>
            </div>

            {data.length ? (
                <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-5'>
                    {data.map(order => (
                        <LatestOrderItem 
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className='text-center my-10'>No hay ordenes lsitas</p>}

        </>
    )
}
