'use client'

import { Product } from "@prisma/client"

/** 
 * Creamos este componente solamente para el boton, ya que usaremos una funcion de zustand y esto se tiene que usar en el cliente
 * como next ejecuta primero el servidor y despues el cliente, para no hacer esto lento en el (ProductCard), mejor 
 * ejecutamos unicamente este boton con su funcion aparte para no hacer la aplicacion lenta
*/
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product}:AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder)

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md transition"
            onClick={() => addToOrder(product)}
        >Agregar</button>
    )
}
