import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"


async function getProducts(category:string) {
  const products = await prisma.product.findMany({ // Traemos todos filtrandolos por..
    where: { // Filtramos...
      category: { // donde en su categoria...
        slug: category // contengan este slug.
      }
    }
  })

  return products
}

export default async function OrderPage({params}:{params: Promise<{category:string}>}) {

  const { category } = await params

  const products = await getProducts(category)

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuacion</Heading>

      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start h-full">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
 