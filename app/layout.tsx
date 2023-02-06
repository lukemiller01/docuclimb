import Link from 'next/link'
import './globals.css'
import Navbar from './Components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <nav>
          <Link href="/"></Link>
          {/* <Link href="/boulders"></Link> */}
          <Link href="/demo"></Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
