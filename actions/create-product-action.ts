"use server"

import { prisma } from "@/src/lib/prisma"
import { productSchema } from "@/src/schemaZod"

export async function createProduct(data: unknown) {
    const result = productSchema.safeParse(data)
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }
    
    await prisma.product.create({data: result.data})
}