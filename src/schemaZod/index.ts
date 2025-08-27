import { z } from 'zod'

export const OrderSchema = z.object({
    name: z.string()
            .min(1, 'Tu nombre es obligatorio'), // Le damos un limite y un mensaje de error
    total: z.number()
            .min(1, 'Hay errores en la orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const orderIdSchema = z.object({
    // Como obtenemos este (order_id) viene como (string, pero zod nos deja transformarlo al validarlo)
    order_id: z.string()
                .transform(value => parseInt(value)) // hacemos uso del metodo, y se le pasa un callback que tendra el value del orderId
    // con (refine) podemos verificar que si se haya convertido bien, le pasamos un callback con un mensaje en dado caso que no funcione
                .refine(value => value > 0, {message: 'HUbo un error al convertir el order_id'})
})

export const searchSchema = z.object({
    search: z.string() // Le decimos que sera un string
                .trim() // Usamos el metodo de zod para eliminar espacios
                .min(1, {message: 'La busqueda no puede ir vacia'}) // Minimo un caracter, y le agregamos un mensaje por si no se cumple
})

export const productSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string()
        .min(1, {message: 'La Imagen es obligatoria'})
})