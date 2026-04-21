'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Topbar() {
  const supabase = createClient()
  const router = useRouter()

  async function logout() {
    await supabase.auth.signOut()
    router.push('/landing')
    router.refresh()
  }

  return (
    <div className="h-16 flex items-center justify-between px-8 border-b border-slate-200 bg-white/70 backdrop-blur">
      <h1 className="text-lg font-semibold">Панель управления</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-400"
      >
        Выйти
      </button>
    </div>
  )
}