'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Client = {
  id: number
  company_name: string
  contact_person: string | null
  phone: string | null
  email: string | null
}

export default function ClientsPage() {
  const supabase = createClient()

  const [clients, setClients] = useState<Client[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  async function load() {
    const { data } = await supabase.from('clients').select('*').order('id', { ascending: false })
    setClients(data || [])
  }

  useEffect(() => { load() }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      await supabase.from('clients').update({
        company_name: companyName,
        contact_person: contactPerson,
        phone,
        email,
      }).eq('id', editingId)
    } else {
      await supabase.from('clients').insert({
        company_name: companyName,
        contact_person: contactPerson,
        phone,
        email,
      })
    }

    setEditingId(null)
    setCompanyName('')
    setContactPerson('')
    setPhone('')
    setEmail('')
    load()
  }

  async function del(id: number) {
    await supabase.from('clients').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Клиенты</h1>

      <form onSubmit={save} className="grid md:grid-cols-4 gap-4 mb-6 bg-white p-6 rounded-2xl border">
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Компания" className="border px-4 py-3 rounded-xl" />
        <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Контакт" className="border px-4 py-3 rounded-xl" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" className="border px-4 py-3 rounded-xl" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border px-4 py-3 rounded-xl" />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          {editingId ? 'Сохранить' : 'Добавить'}
        </button>
      </form>

      <div className="bg-white rounded-2xl border">
        {clients.map(c => (
          <div key={c.id} className="grid grid-cols-5 px-4 py-3 border-t items-center">
            <div>{c.company_name}</div>
            <div>{c.contact_person || '-'}</div>
            <div>{c.phone || '-'}</div>
            <div>{c.email || '-'}</div>

            <div className="flex gap-2">
              <button onClick={() => {
                setEditingId(c.id)
                setCompanyName(c.company_name)
                setContactPerson(c.contact_person || '')
                setPhone(c.phone || '')
                setEmail(c.email || '')
              }} className="bg-yellow-500 text-white px-3 py-2 rounded-lg">
                ✏️
              </button>

              <button onClick={() => del(c.id)} className="bg-red-500 text-white px-3 py-2 rounded-lg">
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}