import { categories } from "./data/categories"; // Datos de los productos
import { products } from "./data/products"; // Datos de las categorias
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.category.createMany({ // Le agregamos todas las categorias con createMany({data: []})
            data: categories
        })
        await prisma.product.createMany({ // Le agregamos todos los productos con createMany({data: []})
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}

main() // Llamamos la funcion
    .then( async () => {
        // Una vez cargados estos datos, cerramos la conexion con un promises para no dejr sesiones abiertas
        await prisma.$disconnect() 
    })
    .catch( async (e) => { // SI hay errores, pasams el error, cerramos conexion y cerramos aplicacion
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })