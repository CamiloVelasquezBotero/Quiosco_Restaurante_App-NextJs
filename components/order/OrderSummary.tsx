'use client' // Usamos en el cliente por que usamos zustand
import { useMemo,  } from "react";
import { toast } from 'react-toastify'
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schemaZod";


export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)

  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0),[order])

  const handleCreateOrder = async (formData:FormData) => { 
    const data = {
      name: formData.get('name'),
      total: total,
      order
    }
    
    // Validacion en el CLIENTE
    const result = OrderSchema.safeParse(data)
    console.log(result)
    if(!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
    // Validacion en el SERVIDOR
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }

    toast.success('Pedido realizado correctamente')
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? <p className="text-center my-10">El pedido esta vacio</p> : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails 
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}

      <p className="text-2xl mt-10 text-center">
        Total a pagar: {' '}
        <span className="font-bold">{formatCurrency(total)}</span>
      </p>

      <form 
        className="w-full mt-10 space-y-5"
        action={handleCreateOrder}
      > 
        <input 
          type="text" 
          placeholder="Tu Nombre"
          className="bg-white border border-gray-100 p-2 w-full"
          name='name'
        />

        <input 
          type="submit" 
          className="py-2 rounded uppercase text-white font-bold bg-black hover:bg-slate-900 w-full text-center cursor-pointer"  
          value={'Confirmar Pedido'}
        />
      </form>
    </aside>
  )
} 
