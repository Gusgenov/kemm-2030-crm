import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">О компании</h1>

        <p className="text-slate-600 leading-relaxed mb-6">
          ТОО «КЭММ-2030» — современное предприятие, специализирующееся на
          производстве и реализации инженерных решений в сфере промышленности и строительства.
        </p>

        <p className="text-slate-600 leading-relaxed">
          Мы обеспечиваем полный цикл выполнения проектов: от разработки до внедрения,
          гарантируя качество и соблюдение сроков.
        </p>
      </div>

      <Footer />
    </div>
  )
}