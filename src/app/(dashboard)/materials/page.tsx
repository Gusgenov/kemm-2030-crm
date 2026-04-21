'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function MaterialsPage() {
  const supabase = createClient()

  const [materials, setMaterials] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('0')
  const [price, setPrice] = useState('0')

  async function load() {
    const { data } = await supabase.from('materials').select('*')
    setMaterials(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      await supabase.from('materials').update({
        name,
        category,
        stock_quantity: Number(stock),
        price: Number(price),
      }).eq('id', editingId)

      setEditingId(null)
    } else {
      await supabase.from('materials').insert({
        name,
        category,
        stock_quantity: Number(stock),
        price: Number(price),
      })
    }

    setName('')
    setCategory('')
    setStock('0')
    setPrice('0')
    load()
  }

  async function deleteMaterial(id: number) {
    await supabase.from('materials').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Материалы</h1>

      {/* ФОРМА */}
      <form onSubmit={save} className="grid md:grid-cols-4 gap-4 mb-6 bg-white p-6 rounded-2xl border">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" className="border px-4 py-3 rounded-xl" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Категория" className="border px-4 py-3 rounded-xl" />
        <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Количество" className="border px-4 py-3 rounded-xl" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Цена" className="border px-4 py-3 rounded-xl" />

        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl col-span-full">
          {editingId ? 'Сохранить изменения' : 'Добавить материал'}
        </button>
      </form>

      {/* СПИСОК */}
      <div className="bg-white rounded-2xl border">
        {materials.map(m => (
          <div key={m.id} className="grid grid-cols-5 px-4 py-3 border-t items-center">
            <div>{m.name}</div>
            <div>{m.category || '-'}</div>
            <div>{m.stock_quantity}</div>
            <div>{m.price}</div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(m.id)
                  setName(m.name)
                  setCategory(m.category || '')
                  setStock(String(m.stock_quantity))
                  setPrice(String(m.price))
                }}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
              >
                ✏️
              </button>

              <button
                onClick={() => deleteMaterial(m.id)}
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