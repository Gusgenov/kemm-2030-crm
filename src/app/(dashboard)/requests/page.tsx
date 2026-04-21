'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Request = {
  id: string
  name: string
  phone: string | null
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
      company_name: req.name,
      phone: req.phone,
    })

    await supabase.from('requests').delete().eq('id', req.id)

    loadRequests()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Заявки</h1>

      <div className="bg-white p-6 rounded-2xl border">
        {requests.map((r) => (
          <div
            key={r.id}
            className="border-b py-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm text-slate-500">{r.phone}</p>
              <p className="text-sm">{r.message}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => createClientFromRequest(r)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg"
              >
                В клиента
              </button>

              <button
                onClick={() => deleteRequest(r.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
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