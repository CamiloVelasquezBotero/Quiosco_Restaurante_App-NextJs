import './globals.css'

export const metadata = {
  title: 'Quiosco Next.Js con App Router y Prisma',
  description: 'Quiosco Next.Js con App Router y Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-100'>{children}</body>
    </html>
  )
}
