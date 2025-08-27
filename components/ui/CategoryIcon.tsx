'use client'

import Image from "next/image" // Next nos ayuda con la optimizacion de imagenes con este componente
import Link from "next/link"
import { useParams } from "next/navigation"
import { Category } from "@prisma/client"

type CategoryIconProps = {
    // Al crear los modelos Prisma crea automaticamente los Types listos para importar e usar
    category: Category
}

export default function CategoryIcon({category}:CategoryIconProps) {

  const params = useParams<{category:string}>()

  return (
      <Link 
        href={`/order/${category.slug}`}
        className={`${category.slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
      >
        <div className="w-16 h-16 relative">
          <Image
            src={`/icon_${category.slug}.svg`}
            alt={`Logo ${category.slug}`}
            fill
            // width={64} // El width y el height es necesario al usar el compontente Image, a no ser que usemos (fill) y le establezcamos en el padre el ancho y altura
            // height={64}
          />
        </div>
        <p className="text-xl font-bol">{category.name}</p>
      </Link>
  )
}
 