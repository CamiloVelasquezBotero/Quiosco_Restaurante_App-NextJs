"use server"

import { prisma } from "@/src/lib/prisma"
import { productSchema } from "@/src/schemaZod"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {
    const result = productSchema.safeParse(data)

    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }
    
    await prisma.product.update({ // Al update se le pasa el where y el data
        where: {
            id
        },
        data: result.data // Le pasamos el nuevo data ya con la validacion de ZOD
    })
    revalidatePath('/admin/products') // Revalidamos los datos al hacer el update
}