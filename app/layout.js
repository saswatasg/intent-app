import "./globals.css"

export const metadata = {
  title: 'Intent — Where meaningful connections begin',
  description: 'A high-intent dating platform. No swiping. 3 curated matches every 48 hours.',
  keywords: 'dating app, serious relationships, no swipe dating, compatibility, India dating',
  authors: [{ name: 'Intent' }],
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Intent' },
  openGraph: {
    title: 'Intent — Where meaningful connections begin',
    description: 'No swiping. 3 curated matches every 48 hours. Real compatibility.',
    type: 'website',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0D1728',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
