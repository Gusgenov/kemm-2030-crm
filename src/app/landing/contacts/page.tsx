'use client'

import { useState } from 'react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ContactsPage() {
  const supabase = createClient()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await supabase.from('clients').insert({
      company_name: name,
      phone,
      notes: message,
    })

    setName('')
    setPhone('')
    setMessage('')

    alert('Заявка отправлена')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">Связаться с нами</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя / компания"
            className="w-full border px-4 py-3 rounded-xl"
            required
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон"
            className="w-full border px-4 py-3 rounded-xl"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Сообщение"
            className="w-full border px-4 py-3 rounded-xl"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500">
            Отправить заявку
          </button>
        </form>
      </div>

      <Footer />
    </div>
  )
}