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
  const [projectType, setProjectType] = useState('production')
  const [status, setStatus] = useState('planning')
  const [budget, setBudget] = useState('0')

  async function loadData() {
    const { data: clientsData } = await supabase.from('clients').select('id, company_name')
    const { data: projectsData } = await supabase
      .from('projects')
      .select('id, title, project_type, status, budget, clients(company_name)')

    setClients(clientsData || [])
    setProjects((projectsData as any) || [])
  }

  useEffect(() => {
    loadData()
  }, [])

  async function addProject(e: React.FormEvent) {
    e.preventDefault()

    await supabase.from('projects').insert({
      client_id: clientId ? Number(clientId) : null,
      title,
      project_type: projectType,
      status,
      budget: Number(budget),
    })

    setClientId('')
    setTitle('')
    setBudget('0')
    loadData()
  }

  async function deleteProject(id: number) {
    await supabase.from('projects').delete().eq('id', id)
    loadData()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Проекты</h1>

      <form onSubmit={addProject} className="grid gap-4 mb-6 bg-white p-6 rounded-2xl border">
        <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="border px-4 py-3 rounded-xl">
          <option value="">Клиент</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.company_name}
            </option>
          ))}
        </select>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" className="border px-4 py-3 rounded-xl" />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl">
          Добавить проект
        </button>
      </form>

      <div className="bg-white p-6 rounded-2xl border">
        <table className="w-full">
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.clients?.[0]?.company_name || '-'}</td>
                <td>
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}