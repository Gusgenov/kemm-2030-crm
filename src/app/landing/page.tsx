import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 text-slate-900">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Инженерные решения
            <br />
            <span className="text-blue-600">
              для промышленности и строительства
            </span>
          </h1>

          <p className="text-slate-600 text-lg mb-10">
            Производство, монтаж и поставка оборудования с полным сопровождением проекта.
          </p>

          <div className="flex gap-4">
            <Link
              href="/landing/contacts"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition"
            >
              Оставить заявку
            </Link>

            <Link
              href="/login"
              className="border border-slate-300 px-6 py-3 rounded-xl hover:bg-white transition"
            >
              Войти
            </Link>
          </div>
        </div>
      </section>

      {/* преимущества */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {[
          'Комплексный подход',
          'Собственное производство',
          'Контроль качества',
        ].map((item) => (
          <div
            key={item}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-2">{item}</h3>
            <p className="text-slate-500 text-sm">
              Реализация проектов любой сложности с гарантией результата.
            </p>
          </div>
        ))}
      </section>

      {/* услуги */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold mb-10">Наши услуги</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            'Производство изделий',
            'Нестандартные конструкции',
            'Монтажные работы',
            'Поставка оборудования',
          ].map((service) => (
            <div
              key={service}
              className="bg-gradient-to-br from-blue-100 to-purple-100 border border-slate-200 p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold">{service}</h3>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}