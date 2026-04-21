'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/dashboard', label: 'Дашборд' },
  { href: '/clients', label: 'Клиенты' },
  { href: '/projects', label: 'Проекты' },
  { href: '/tasks', label: 'Задачи' },
  { href: '/materials', label: 'Материалы' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6">
      <h2 className="text-xl font-bold mb-8">КЭММ-2030</h2>

      <nav className="space-y-2">
        {items.map((item) => {
          const active = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-xl ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}