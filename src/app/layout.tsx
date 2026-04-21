import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'КЭММ-2030 CRM',
  description: 'Система управления проектами и клиентами',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  )
}