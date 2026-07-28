import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chamber of Food & Agriculture Pakistan | Empowering Farmers, Feeding the Future',
  description: 'Chamber of Food and Agriculture Pakistan unites farmers, agribusinesses, and stakeholders to promote sustainable agriculture, food security, and market development. Join us to empower farmers and enhance the agricultural value chain.',
  keywords: 'Chamber of Food and Agriculture, CFA Pakistan, agriculture Pakistan, food security, sustainable agriculture, agribusiness, farmers Pakistan, agricultural development, agritech, food production, farming innovation',
  authors: [{ name: 'Chamber of Food & Agriculture Pakistan' }],
  openGraph: {
    title: 'Chamber of Food & Agriculture Pakistan',
    description: 'Empowering Farmers, Feeding the Future. Connecting industry leaders for a sustainable future in agriculture and food production.',
    url: 'https://cfapak.org',
    siteName: 'Chamber of Food & Agriculture Pakistan',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chamber of Food & Agriculture Pakistan',
    description: 'Empowering Farmers, Feeding the Future',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#16A34A" />
      </head>
      <body>{children}</body>
    </html>
  )
}
