'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TasksPage() {
  const supabase = createClient()

  const [tasks, setTasks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('todo')

  async function load() {
    const { data } = await supabase.from('tasks').select('*')
    setTasks(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()

    await supabase.from('tasks').insert({
      title,
      status,
    })

    setTitle('')
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Задачи</h1>

      <form onSubmit={add} className="grid md:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-2xl border">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" className="border px-4 py-3 rounded-xl" />

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="todo">Новая</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          Добавить
        </button>
      </form>

      <div className="bg-white rounded-2xl border">
        {tasks.map((t) => (
          <div key={t.id} className="flex justify-between px-4 py-3 border-t">
            {t.title}
            <span>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}