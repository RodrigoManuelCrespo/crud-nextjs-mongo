import './globals.css'
import { Montserrat } from 'next/font/google'
import { Providers } from "./providers";
import NavbarComponent from '@/components/Navbar';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'PlanApp',
  description: 'Tu asistente para la organización diaria.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={montserrat.className} >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
