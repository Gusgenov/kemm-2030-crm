'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Task = {
  id: number
  title: string
}

export default function TasksPage() {
  const supabase = createClient()

  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  async function loadTasks() {
    const { data } = await supabase.from('tasks').select('*')
    setTasks(data || [])
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function addTask(e: React.FormEvent) {
    e.preventDefault()
    await supabase.from('tasks').insert({ title })
    setTitle('')
    loadTasks()
  }

  async function deleteTask(id: number) {
    await supabase.from('tasks').delete().eq('id', id)
    loadTasks()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Задачи</h1>

      <form onSubmit={addTask} className="mb-6 bg-white p-6 rounded-2xl border">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="border px-4 py-3 rounded-xl w-full mb-4" />
        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl">
          Добавить
        </button>
      </form>

      <div className="bg-white p-6 rounded-2xl border">
        {tasks.map((t) => (
          <div key={t.id} className="flex justify-between mb-2">
            {t.title}
            <button onClick={() => deleteTask(t.id)} className="text-red-500">
              удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}