import { Providers } from '../providers'
import '../globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Mokuteki',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
