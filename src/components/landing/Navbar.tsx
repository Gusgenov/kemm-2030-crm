import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">КЭММ-2030</h1>

        <nav className="flex gap-6 text-sm text-slate-600">
          <Link href="/landing">Главная</Link>
          <Link href="/landing/services">Услуги</Link>
          <Link href="/landing/contacts">Контакты</Link>
        </nav>

        <Link
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
        >
          Войти
        </Link>
      </div>
    </header>
  )
}