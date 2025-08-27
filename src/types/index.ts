import { Order, OrderProducts, Product } from "@prisma/client"; // Type creado por prisma

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
}

// Generamos el type de las Ordenes obtenidas en (admin) con los types que nos creo Prisma
export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[] // Lo definimos como arreglo pro que seran varios
}