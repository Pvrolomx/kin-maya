import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://kin-maya.duendes.app'),
  title: {
    default: 'KIN - Tu Guía Maya Diaria | Calendario Tzolkin',
    template: '%s | KIN Maya'
  },
  description: 'Descubre tu energía Maya diaria con el calendario sagrado Tzolkin de 260 días. Calcula tu Kin, conoce tu sello solar, tono galáctico y oráculo personal.',
  keywords: ['kin maya', 'calendario tzolkin', 'sello solar', 'tono galáctico', 'horóscopo maya', 'energía maya', 'calendario sagrado', '260 días', 'oráculo maya'],
  authors: [{ name: 'Duendes', url: 'https://duendes.app' }],
  creator: 'Duendes',
  publisher: 'Duendes',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    url: 'https://kin-maya.duendes.app',
    siteName: 'KIN Maya',
    title: 'KIN - Tu Guía Maya Diaria',
    description: 'Descubre tu energía según el calendario sagrado Tzolkin de 260 días.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KIN - Calendario Maya Tzolkin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KIN - Tu Guía Maya Diaria',
    description: 'Descubre tu energía según el calendario sagrado Tzolkin.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://kin-maya.duendes.app',
    languages: {
      'es': 'https://kin-maya.duendes.app',
      'en': 'https://kin-maya.duendes.app',
    },
  },
  category: 'spirituality',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'KIN - Tu Guía Maya Diaria',
  description: 'Calculadora del calendario Maya Tzolkin. Descubre tu Kin, sello solar y tono galáctico.',
  url: 'https://kin-maya.duendes.app',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Duendes',
    url: 'https://duendes.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://kin-maya.duendes.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}`,
          }}
        />
      </body>
    </html>
  )
}
