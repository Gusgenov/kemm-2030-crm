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

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  async function loadClients() {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('id', { ascending: false })

    setClients(data || [])
  }

  useEffect(() => {
    loadClients()
  }, [])

  async function addClient(e: React.FormEvent) {
    e.preventDefault()

    await supabase.from('clients').insert({
      company_name: companyName,
      contact_person: contactPerson,
      phone,
      email,
    })

    setCompanyName('')
    setContactPerson('')
    setPhone('')
    setEmail('')
    loadClients()
  }

  async function deleteClient(id: number) {
    await supabase.from('clients').delete().eq('id', id)
    loadClients()
  }

  return (
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

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  async function loadClients() {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('id', { ascending: false })

    setClients(data || [])
  }

  useEffect(() => {
    loadClients()
  }, [])

  async function addClient(e: React.FormEvent) {
    e.preventDefault()

    await supabase.from('clients').insert({
      company_name: companyName,
      contact_person: contactPerson,
      phone,
      email,
    })

    setCompanyName('')
    setContactPerson('')
    setPhone('')
    setEmail('')
    loadClients()
  }

  async function deleteClient(id: number) {
    await supabase.from('clients').delete().eq('id', id)
    loadClients()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Клиенты</h1>

      {/* ФОРМА */}
      <form
        onSubmit={addClient}
        className="grid md:grid-cols-4 gap-4 mb-6 bg-white p-6 rounded-2xl border"
      >
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Компания" className="border px-4 py-3 rounded-xl" required />
        <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Контакт" className="border px-4 py-3 rounded-xl" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" className="border px-4 py-3 rounded-xl" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border px-4 py-3 rounded-xl" />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          Добавить клиента
        </button>
      </form>

      {/* ТАБЛИЦА */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="grid grid-cols-5 bg-slate-100 px-4 py-3 font-semibold">
          <div>Компания</div>
          <div>Контакт</div>
          <div>Телефон</div>
          <div>Email</div>
          <div></div>
        </div>

        {clients.map((c) => (
          <div key={c.id} className="grid grid-cols-5 px-4 py-3 border-t items-center">
            <div>{c.company_name}</div>
            <div>{c.contact_person || '-'}</div>
            <div>{c.phone || '-'}</div>
            <div>{c.email || '-'}</div>

            <button
              onClick={() => deleteClient(c.id)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
  )
}