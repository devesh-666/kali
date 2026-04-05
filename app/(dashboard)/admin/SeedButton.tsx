'use client'

import { useState } from 'react'
import { Database, Check, AlertCircle, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

export default function SeedButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSeed = async () => {
    if (status === 'loading') return
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Seed failed.')
      } else {
        setStatus('success')
        setMessage(data.message ?? 'Database seeded successfully.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Could not reach the API.')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleSeed}
        disabled={status === 'loading'}
        className={clsx(
          'inline-flex items-center gap-2 px-4 py-2.5 rounded-md',
          'text-sm font-mono border transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/40',
          status === 'loading'
            ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400 cursor-wait'
            : status === 'success'
            ? 'bg-green-500/10 border-green-500/30 text-green-400'
            : status === 'error'
            ? 'bg-red-500/10 border-red-500/30 text-red-400'
            : 'bg-[#1a1a1a] border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/50'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Seeding...
          </>
        ) : status === 'success' ? (
          <>
            <Check size={14} />
            Seeded!
          </>
        ) : status === 'error' ? (
          <>
            <AlertCircle size={14} />
            Failed
          </>
        ) : (
          <>
            <Database size={14} />
            Seed Database
          </>
        )}
      </button>

      {message && (
        <p
          className={clsx(
            'text-xs font-mono',
            status === 'success' ? 'text-green-400' : 'text-red-400'
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
}
