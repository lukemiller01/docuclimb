import Link from 'next/link'
import './globals.css'

export default function RootLayout({children}: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head/>
      <body className=' bg-light-grey'>
        <nav>
          <Link href="/"></Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
