import type { Milestone } from '../types'

interface Props {
  milestones: Milestone[]
  onToggle: (id: number, completed: boolean) => void
}

const phaseColors = ['', '#00ff88', '#7c3aed', '#0ea5e9']
const phaseLabels = ['', 'Phase 1 — ML Foundations', 'Phase 2 — Deep Learning + PyTorch', 'Phase 3 — Computer Vision + Capstone']
const phaseDates = ['', 'May 23 – Jun 1', 'Jun 2 – Jul 10', 'Jul 11 – Aug 24']

export default function MilestoneList({ milestones, onToggle }: Props) {
  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Milestones</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {[1, 2, 3].map(phase => {
          const phaseMilestones = milestones.filter(m => m.phase === phase)
          const done = phaseMilestones.filter(m => m.completed).length
          const color = phaseColors[phase]

          return (
            <div key={phase}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>{phaseLabels[phase]}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: '0.75rem' }}>{phaseDates[phase]}</span>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color, fontFamily: 'monospace' }}>
                  {done}/{phaseMilestones.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.5rem', borderLeft: `2px solid ${color}22` }}>
                {phaseMilestones.map(m => (
                  <div key={m.id} style={{
                    background: 'var(--surface)',
                    border: `1px solid ${m.completed ? color + '33' : 'var(--border)'}`,
                    borderRadius: '8px',
                    padding: '0.875rem 1rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    transition: 'border-color 0.2s ease',
                  }}>
                    <input
                      type="checkbox"
                      checked={m.completed}
                      onChange={e => onToggle(m.id, e.target.checked)}
                      style={{ accentColor: color, width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 500,
                        color: m.completed ? 'var(--muted)' : 'var(--text)',
                        textDecoration: m.completed ? 'line-through' : 'none',
                        marginBottom: '0.2rem',
                      }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{m.description}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'monospace', flexShrink: 0 }}>
                      {m.due_date}
                    </div>
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
