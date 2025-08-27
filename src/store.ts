import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[],
    addToOrder: (product:Product) => void,
    increaseQuantity: (id:Product['id']) => void,
    decreaseQuantity: (id:Product['id']) => void,
    removeItem: (id:Product['id']) => void,
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],

    addToOrder: (product) => {
        const {categoryId, image, ...data} = product // Sacamos lo ue no necesitamos e instanciamos lo que si necesitamos con data

        // Condicion si ya existe en el order
        let order:OrderItem[] = []
        if(get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, { // Obtenemos con get y lo añadimos
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set((state) => ({ // Establecemos en el state
            order: order
        }))
    },

    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },

    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1) 
        } : item)
    

        set((state) => ({
            order: order
        }))
    },

    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },

    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))