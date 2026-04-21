'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TasksPage() {
  const supabase = createClient()

  const [tasks, setTasks] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [title, setTitle] = useState('')
  const [projectId, setProjectId] = useState('')
  const [status, setStatus] = useState('todo')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  async function load() {
    const { data: t } = await supabase
      .from('tasks')
      .select('*, projects(title)')
      .order('id', { ascending: false })

    const { data: p } = await supabase
      .from('projects')
      .select('id, title')

    setTasks(t || [])
    setProjects(p || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      await supabase.from('tasks').update({
        title,
        project_id: projectId || null,
        status,
        priority,
        due_date: dueDate || null,
      }).eq('id', editingId)

      setEditingId(null)
    } else {
      await supabase.from('tasks').insert({
        title,
        project_id: projectId || null,
        status,
        priority,
        due_date: dueDate || null,
      })
    }

    setTitle('')
    setProjectId('')
    setStatus('todo')
    setPriority('medium')
    setDueDate('')
    load()
  }

  async function deleteTask(id: number) {
    await supabase.from('tasks').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Задачи</h1>

      {/* ФОРМА */}
      <form onSubmit={save} className="grid md:grid-cols-5 gap-4 mb-6 bg-white p-6 rounded-2xl border">

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" className="border px-4 py-3 rounded-xl" />

        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="">Проект</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="todo">Новая</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>

        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border px-4 py-3 rounded-xl" />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          {editingId ? 'Сохранить изменения' : 'Добавить задачу'}
        </button>
      </form>

      {/* СПИСОК */}
      <div className="bg-white rounded-2xl border">
        {tasks.map(t => (
          <div key={t.id} className="grid grid-cols-6 px-4 py-3 border-t items-center">
            <div>{t.title}</div>
            <div>{t.projects?.[0]?.title || '-'}</div>
            <div>{t.status}</div>
            <div>{t.priority}</div>
            <div>{t.due_date || '-'}</div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(t.id)
                  setTitle(t.title)
                  setProjectId(t.project_id || '')
                  setStatus(t.status)
                  setPriority(t.priority)
                  setDueDate(t.due_date || '')
                }}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
              >
                ✏️
              </button>

              <button
                onClick={() => deleteTask(t.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}