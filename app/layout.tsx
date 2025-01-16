import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Decision Engine',
  description: 'Make structured decisions with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
