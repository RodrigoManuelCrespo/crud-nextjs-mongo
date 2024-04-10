import { Providers } from '../providers'
import '../globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

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
      <body className={poppins.className} >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
