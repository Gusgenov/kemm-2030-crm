export default function DashboardCard({
    title,
    value,
  }: {
    title: string
    value: string | number
  }) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="mt-3 text-3xl font-bold">{value}</h3>
      </div>
    )
  }