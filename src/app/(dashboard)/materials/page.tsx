'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Material = {
  id: number
  name: string
}

export default function MaterialsPage() {
  const supabase = createClient()

  const [materials, setMaterials] = useState<Material[]>([])
  const [name, setName] = useState('')

  async function load() {
    const { data } = await supabase.from('materials').select('*')
    setMaterials(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()
    await supabase.from('materials').insert({ name })
    setName('')
    load()
  }

  async function del(id: number) {
    await supabase.from('materials').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Материалы</h1>

      <form onSubmit={add} className="mb-6 bg-white p-6 rounded-2xl border">
        <input value={name} onChange={(e) => setName(e.target.value)} className="border px-4 py-3 rounded-xl w-full mb-4" />
        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl">
          Добавить
        </button>
      </form>

      <div className="bg-white p-6 rounded-2xl border">
        {materials.map((m) => (
          <div key={m.id} className="flex justify-between mb-2">
            {m.name}
            <button onClick={() => del(m.id)} className="text-red-500">
              удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}