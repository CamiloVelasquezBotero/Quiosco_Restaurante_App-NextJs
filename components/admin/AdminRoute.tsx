'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

type AdminRouteProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}

export default function AdminRoute({link}:AdminRouteProps) {

  const pathname = usePathname()
  const isActive = pathname.startsWith(link.url)

  return (
    <Link
        className={`${isActive ? 'bg-amber-400' : ''} hover:bg-amber-100 transition font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
        href={link.url}
        target={link.blank ? '_blank' : ''} // Si esta como (true) entonces abrimos en una pestaña nueva
    >{link.text}</Link>
  )
}
