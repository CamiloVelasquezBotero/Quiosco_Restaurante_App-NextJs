import { prisma } from "@/src/lib/prisma";

// La api cachea los datos, entonces para que no se demore tanot en actualizar forzamos la actualizacion dinamica
// Instanciando de esta forma y exportandolo
export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        take: 5, // Limitamos que solo se traiga 5
        where: { // Filtramos por...
            orderReadyAt: {
                not: null // Nos traemos las que no tengan (Null) osea las que ya estan listas
            }
        },
        orderBy: { // Ordenamos de manera descendente
            orderReadyAt: 'desc' 
        },
        include: { // Incluimos tambien la orden de los productos
            orderProducts: {
                include: {
                    product: true // E incluimos los productos de la orden
                }
            }
        }
    })
    return Response.json(orders)
}