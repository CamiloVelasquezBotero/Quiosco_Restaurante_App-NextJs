import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client" // Type generado por Prisma
import Image from "next/image" // Componente de Next para optimizar Imagenes
import AddProductButton from "./AddProductButton"

type ProductCardProps =  {
    product: Product
}

export default function ProductCard({product}:ProductCardProps) {

    const imagePath = getImagePath(product.image)

  return (

    <div className="shadow-lg bg-white">

        <Image 
            src={imagePath} // Segun su imagePath, renderizada desde los archivos locales o desde cloudinary
            alt={`Imagen platillo ${product.name}`}
            width={400}
            height={500}
            quality={75} // El default si no se le coloca es 75% de calidad
            priority
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatCurrency(product.price)}
            </p>
            {/* Como necesitamos que este boton use la funcion del store de zustand, necesitamos que se ejecute en el cleinte
            para no hacer toda la aplicacion lenta, separamos unicamente este boton, y hacer de esta manera al aplicacion mas agil */}
            <AddProductButton 
                product={product}
            /> 
        </div>
    </div>
  )
}
