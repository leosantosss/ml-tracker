import { useState } from 'react'
import { X } from 'lucide-react'

interface Props {
  onSubmit: (data: { date: string; studied: boolean; hours?: number; notes?: string }) => void
  onClose: () => void
}

export default function CheckinModal({ onSubmit, onClose }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const [studied, setStudied] = useState(true)
  const [hours, setHours] = useState('')
  const [notes, setNotes] = useState('')

  const submit = () => {
    onSubmit({
      date: today,
      studied,
      hours: hours ? parseFloat(hours) : undefined,
      notes,
    })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100,
    }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '1.5rem',
        width: '100%', maxWidth: '420px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>Daily Check-in</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{today}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>Did you study today?</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  onClick={() => setStudied(val)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '6px',
                    border: `1px solid ${studied === val ? 'var(--accent)' : 'var(--border)'}`,
                    background: studied === val ? 'rgba(0,255,136,0.1)' : 'transparent',
                    color: studied === val ? 'var(--accent)' : 'var(--muted)',
                    cursor: 'pointer', fontSize: '0.85rem',
                  }}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>Hours studied</div>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              placeholder="e.g. 2.5"
              value={hours}
              onChange={e => setHours(e.target.value)}
              style={{
                width: '100%', padding: '0.5rem 0.75rem',
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '6px', color: 'var(--text)', fontSize: '0.875rem',
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>What did you work on?</div>
            <textarea
              placeholder="e.g. Finished Andrew Ng week 2, started PyTorch tensors..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '0.5rem 0.75rem',
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '6px', color: 'var(--text)', fontSize: '0.875rem',
                resize: 'vertical', fontFamily: 'inherit',
              }}
            />
          </div>

          <button
            onClick={submit}
            style={{
              width: '100%', padding: '0.65rem',
              background: 'var(--accent)', color: '#000',
              border: 'none', borderRadius: '8px',
              fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            }}
          >
            Save Check-in
          </button>
        </div>
      </div>
    </div>
  )
}
