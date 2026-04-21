export default function Section({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="text-slate-600 leading-relaxed">{children}</div>
      </section>
    )
  }