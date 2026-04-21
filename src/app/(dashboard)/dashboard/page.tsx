import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ count: clients }, { count: projects }, { count: tasks }] =
    await Promise.all([
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('tasks').select('*', { count: 'exact', head: true }),
    ])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Дашборд</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-slate-500">Клиенты</p>
          <h3 className="text-3xl font-bold">{clients ?? 0}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-slate-500">Проекты</p>
          <h3 className="text-3xl font-bold">{projects ?? 0}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-slate-500">Задачи</p>
          <h3 className="text-3xl font-bold">{tasks ?? 0}</h3>
        </div>
      </div>
    </div>
  )
}