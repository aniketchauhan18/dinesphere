import {
  ClerkProvider
} from '@clerk/nextjs'
import './globals.css'
import { inter } from '@/components/fonts'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>DineSphere</title>
        </head>
        <body className={`${inter.className} antialiased min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}