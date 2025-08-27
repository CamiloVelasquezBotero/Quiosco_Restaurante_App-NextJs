"use server"
import { prisma } from "@/src/lib/prisma"
// Aqui iran los SERVER ACTIONS de next

import { OrderSchema } from "@/src/schemaZod"

export async function createOrder(data:unknown) {
    // Verificacion/tipado con Zod
    const result = OrderSchema.safeParse(data)
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        // Creamos la orden
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        // El (orderId) se crea en automatico, ya que como estamos creando order dentro del contexto, prisma ya sabe cual es
                        productId: product.id,
                        quantity: product.quantity
                    }))  
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}