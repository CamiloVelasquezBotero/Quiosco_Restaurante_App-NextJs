import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import React from 'react'

export default function CreateProductPage() {

  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm>
        <ProductForm /> {/* Como este compontente es del servidor lo pasamos como children, para no renderizarlo directamente y no genere error ya que el padre es del cliente  */}
      </AddProductForm>
    </>
  )
}
