import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

export default function ServicesPage() {
  const services = [
    {
      title: 'Производство изделий',
      desc: 'Серийное и индивидуальное производство продукции.',
    },
    {
      title: 'Нестандартные конструкции',
      desc: 'Разработка уникальных решений под задачи клиента.',
    },
    {
      title: 'Монтажные работы',
      desc: 'Профессиональная установка и запуск оборудования.',
    },
    {
      title: 'Поставка оборудования',
      desc: 'Широкий ассортимент материалов и техники.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-10">Услуги</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            >
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}