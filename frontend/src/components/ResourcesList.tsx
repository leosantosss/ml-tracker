import { ExternalLink } from 'lucide-react'
import type { Resource } from '../types'

interface Props {
  resources: Resource[]
  onToggle: (id: number, completed: boolean) => void
}

const typeColors: Record<Resource['type'], string> = {
  course: 'var(--accent3)',
  video: 'var(--accent2)',
  competition: 'var(--accent)',
  paper: '#f59e0b',
}

const phaseLabels = ['', 'Phase 1', 'Phase 2', 'Phase 3']

export default function ResourcesList({ resources, onToggle }: Props) {
  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Resources</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {[1, 2, 3].map(phase => {
          const phaseResources = resources.filter(r => r.phase === phase)
          const done = phaseResources.filter(r => r.completed).length

          return (
            <div key={phase}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{phaseLabels[phase]}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                  {done}/{phaseResources.length} completed
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {phaseResources.map(r => (
                  <div key={r.id} style={{
                    background: 'var(--surface)',
                    border: `1px solid ${r.completed ? 'var(--accent)33' : 'var(--border)'}`,
                    borderRadius: '8px', padding: '0.875rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}>
                    <input
                      type="checkbox"
                      checked={r.completed}
                      onChange={e => onToggle(r.id, e.target.checked)}
                      style={{ accentColor: 'var(--accent)', width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                      <span style={{
                        color: r.completed ? 'var(--muted)' : 'var(--text)',
                        textDecoration: r.completed ? 'line-through' : 'none',
                        fontSize: '0.875rem', fontWeight: 500,
                      }}>
                        {r.title}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '0.65rem', padding: '0.2rem 0.5rem',
                      borderRadius: '4px', background: typeColors[r.type] + '22',
                      color: typeColors[r.type], textTransform: 'uppercase',
                      letterSpacing: '0.05em', flexShrink: 0,
                    }}>
                      {r.type}
                    </span>
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', flexShrink: 0 }}>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
