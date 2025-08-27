import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/order/cafe') // Redireccionamos a la pagina principal para hacer el pedido
}
