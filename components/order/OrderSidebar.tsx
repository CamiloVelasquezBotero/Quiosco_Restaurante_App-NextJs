//import { PrismaClient } from '@prisma/client'

// importamos la instancia de prisma desde lib, de esta forma nos evitamso estarlo llamando en cada componente y crear conexiones nuevas cada vez que lo necesitemos
import { prisma } from '@/src/lib/prisma' 
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

//const prismaClient = new PrismaClient() // Instanciamos Prisma

async function getCategories() {
  return await prisma.category.findMany() // Buscamos por las categorias y nos traemos todo con findMany()
}

export default async function OrderSidebar() {

  const categories = await getCategories()

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />

      <nav className='mt-10'>
        {categories.map(category => (
          <CategoryIcon
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </aside>
  )
}
