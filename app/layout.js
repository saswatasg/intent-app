import "./globals.css"

export const metadata = {
  title: 'Intent — Modern dating, built for intent',
  description: "For people who want serious relationships without endless swiping. AI-curated matches. Verified profiles. Built for India's 24-30s.",
  keywords: 'serious dating, intentional dating, urban India dating, marriage track, compatibility',
  authors: [{ name: 'Intent' }],
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Intent' },
  openGraph: {
    title: 'Intent — Modern dating, built for intent',
    description: "For people who want serious relationships without endless swiping. AI-curated matches. Verified profiles. Built for India's 24-30s.",
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
