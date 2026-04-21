'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ProjectsPage() {
  const supabase = createClient()

  const [projects, setProjects] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [clientId, setClientId] = useState('')
  const [title, setTitle] = useState('')
  const [projectType, setProjectType] = useState('production')
  const [status, setStatus] = useState('planning')
  const [budget, setBudget] = useState('0')

  async function load() {
    const { data: p } = await supabase
      .from('projects')
      .select('*, clients(company_name)')

    const { data: c } = await supabase
      .from('clients')
      .select('id, company_name')

    setProjects(p || [])
    setClients(c || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      await supabase.from('projects').update({
        client_id: clientId || null,
        title,
        project_type: projectType,
        status,
        budget: Number(budget),
      }).eq('id', editingId)

      setEditingId(null)
    } else {
      await supabase.from('projects').insert({
        client_id: clientId || null,
        title,
        project_type: projectType,
        status,
        budget: Number(budget),
      })
    }

    setClientId('')
    setTitle('')
    setProjectType('production')
    setStatus('planning')
    setBudget('0')

    load()
  }

  async function deleteProject(id: number) {
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Проекты</h1>

      {/* ФОРМА (НЕ УРЕЗАНА) */}
      <form onSubmit={save} className="grid md:grid-cols-5 gap-4 mb-6 bg-white p-6 rounded-2xl border">

        <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="">Клиент</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.company_name}</option>
          ))}
        </select>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название"
          className="border px-4 py-3 rounded-xl"
        />

        <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="production">Производство</option>
          <option value="installation">Монтаж</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="planning">План</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готов</option>
        </select>

        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Бюджет"
          className="border px-4 py-3 rounded-xl"
        />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          {editingId ? 'Сохранить изменения' : 'Добавить проект'}
        </button>
      </form>

      {/* СПИСОК */}
      <div className="bg-white rounded-2xl border">
        {projects.map(p => (
          <div key={p.id} className="grid grid-cols-6 px-4 py-3 border-t items-center">
            <div>{p.title}</div>
            <div>{p.clients?.[0]?.company_name || '-'}</div>
            <div>{p.project_type}</div>
            <div>{p.status}</div>
            <div>{p.budget}</div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(p.id)
                  setTitle(p.title)
                  setProjectType(p.project_type)
                  setStatus(p.status)
                  setBudget(String(p.budget))
                }}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
              >
                ✏️
              </button>

              <button
                onClick={() => deleteProject(p.id)}
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