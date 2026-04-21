'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header({ title }: { title: string }) {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-slate-500 mt-1">Панель управления системой</p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-500"
      >
        Выйти
      </button>
    </div>
  )
}