'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Request = {
  id: string
  name: string
  company: string | null
  phone: string | null
  email: string | null
  message: string | null
}

export default function RequestsPage() {
  const supabase = createClient()

  const [requests, setRequests] = useState<Request[]>([])

  async function loadRequests() {
    const { data } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false })

    setRequests(data || [])
  }

  useEffect(() => {
    loadRequests()
  }, [])

  async function deleteRequest(id: string) {
    await supabase.from('requests').delete().eq('id', id)
    loadRequests()
  }

  async function createClientFromRequest(req: Request) {
    await supabase.from('clients').insert({
      company_name: req.company || req.name,
      contact_person: req.name,
      phone: req.phone,
      email: req.email,
    })

    await supabase.from('requests').delete().eq('id', req.id)

    loadRequests()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Заявки</h1>

      <div className="bg-white p-6 rounded-2xl border">
        {requests.length === 0 && (
          <p className="text-slate-500">Заявок пока нет</p>
        )}

        {requests.map((r) => (
          <div
            key={r.id}
            className="border-b py-4 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-lg">
                {r.company || 'Без компании'}
              </p>

              <p className="text-sm text-slate-600">
                Контакт: {r.name}
              </p>

              <p className="text-sm text-slate-500">
                📞 {r.phone || '-'}
              </p>

              <p className="text-sm text-slate-500">
                ✉️ {r.email || '-'}
              </p>

              {r.message && (
                <p className="text-sm mt-2">
                  {r.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => createClientFromRequest(r)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500"
              >
                В клиента
              </button>

              <button
                onClick={() => deleteRequest(r.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-400"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}