
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from './components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contact Manager Dashboard',
  description: 'Full-stack contact management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground min-h-screen`}>
        <ToastProvider>
          <div className="container mx-auto px-6 py-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-center mb-2">Contact Manager</h1>
              <p className="text-center text-foreground/70">
                Manage your contacts
              </p>
            </header>
            <main className="min-h-[calc(100vh-200px)]">
              {children}
            </main>
            <footer className="mt-12 text-center text-sm text-foreground/50">
            </footer>
          </div>
        </ToastProvider>
     </body>
    </html>
  )
}
