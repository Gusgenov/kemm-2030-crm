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

      <form
        onSubmit={addClient}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-2xl border"
      >
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Компания"
          className="border px-4 py-3 rounded-xl"
          required
        />
        <input
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          placeholder="Контакт"
          className="border px-4 py-3 rounded-xl"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          className="border px-4 py-3 rounded-xl"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border px-4 py-3 rounded-xl"
        />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          Добавить клиента
        </button>
      </form>

      <div className="bg-white p-6 rounded-2xl border">
        <table className="w-full">
          <thead>
            <tr>
              <th>Компания</th>
              <th>Контакт</th>
              <th>Телефон</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.company_name}</td>
                <td>{c.contact_person || '-'}</td>
                <td>{c.phone || '-'}</td>
                <td>{c.email || '-'}</td>
                <td>
                  <button
                    onClick={() => deleteClient(c.id)}
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