"use server"

import { revalidatePath } from 'next/cache' // Relavidamos toda la UrL completa (Actualizar)
import { prisma } from "@/src/lib/prisma"
import { orderIdSchema } from "@/src/schemaZod"

export async function completeOrder(formData:FormData) {
    
    const data = {
        order_id: formData.get('order_id')
    }
    const result = orderIdSchema.safeParse(data)
    if(result.success) {
        try {
            await prisma.order.update({
                where: { // Hacemos el where para indicarle a cual
                    id: result.data.order_id // le pasamos el orderId ya convertiro a number con zod y validado
                },
                data: { // Le pasamos los datos a actualizar
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })

            // Reavlidamos los datos con el componente que nos da Next, para actualizar toda la UrL
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log('Error')
        }
    }

}