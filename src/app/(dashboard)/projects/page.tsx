'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Client = {
  id: number
  company_name: string
}

type Project = {
  id: number
  title: string
  project_type: string
  status: string
  budget: number
  clients: { company_name: string }[] | null
}

export default function ProjectsPage() {
  const supabase = createClient()

  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  const [clientId, setClientId] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('production')
  const [status, setStatus] = useState('planning')
  const [budget, setBudget] = useState('0')

  async function load() {
    const { data: c } = await supabase.from('clients').select('*')
    const { data: p } = await supabase.from('projects').select('*, clients(company_name)')

    setClients(c || [])
    setProjects(p || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()

    await supabase.from('projects').insert({
      client_id: clientId || null,
      title,
      project_type: type,
      status,
      budget: Number(budget),
    })

    setTitle('')
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Проекты</h1>

      <form onSubmit={add} className="grid md:grid-cols-5 gap-4 mb-6 bg-white p-6 rounded-2xl border">
        <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="">Клиент</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.company_name}</option>
          ))}
        </select>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" className="border px-4 py-3 rounded-xl" />

        <select value={type} onChange={(e) => setType(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="production">Производство</option>
          <option value="installation">Монтаж</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="planning">План</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готов</option>
        </select>

        <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Бюджет" className="border px-4 py-3 rounded-xl" />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          Добавить
        </button>
      </form>

      <div className="bg-white rounded-2xl border">
        {projects.map((p) => (
          <div key={p.id} className="grid grid-cols-5 px-4 py-3 border-t">
            <div>{p.title}</div>
            <div>{p.clients?.[0]?.company_name || '-'}</div>
            <div>{p.project_type}</div>
            <div>{p.status}</div>
            <div>{p.budget}</div>
          </div>
        ))}
      </div>
    </div>
  )
}