import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KIN - Tu Guía Maya Diaria',
  description: 'Descubre tu energía Maya diaria con el calendario Tzolkin',
  manifest: '/manifest.json',
  themeColor: '#1a1a2e',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="maya-pattern min-h-screen">
        {children}
      </body>
    </html>
  )
}
