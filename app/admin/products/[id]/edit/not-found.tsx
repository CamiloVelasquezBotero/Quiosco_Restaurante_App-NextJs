import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <Heading>Producto No Encontrado</Heading>
      <Link
        href={'/admin/products'}
        className="bg-amber-400 hover:bg-amber-300 transition text-black px-10 py-2 text-xl text-center font-bold cursor-pointer w-full lg:w-auto "
      >Ir a productos</Link>
    </div>
  )
}
