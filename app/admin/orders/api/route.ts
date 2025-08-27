/** Todo (route.ts) funcionara como Api Rest en NextJs, y la ruta para llamarla sera desde la carpeta del app, en este
 * caso seria "localhost/admin/order/api" y usamos los metodos de la api rest GET, POST, PUT...
 */

import { prisma } from "@/src/lib/prisma"

// La api cachea los datos, entonces para que no se demore tanot en actualizar forzamos la actualizacion dinamica
// Instanciando de esta forma y exportandolo
export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        // Nos traemos unicamente las que esten incompletas osea con el estado en false
        where: {
            status: false
        },
        // Hacemos un tipo (populate) como se haria en MongoDB 
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    // (Response, hace referencia al (res) que se usaria usando express)
    return Response.json(orders)
}