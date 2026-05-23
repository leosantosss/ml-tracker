import type { Milestone, Stats } from '../types'
import type { View } from '../App'

interface Props {
  milestones: Milestone[]
  stats: Stats | null
  onToggle: (id: number, completed: boolean) => void
  setView: (v: View) => void
}

const phaseColors = ['', 'var(--accent)', 'var(--accent2)', 'var(--accent3)']
const phaseLabels = ['', 'Phase 1 — ML Foundations', 'Phase 2 — Deep Learning + PyTorch', 'Phase 3 — Computer Vision + Capstone']
const phaseDates = ['', 'May 23 – Jun 1', 'Jun 2 – Jul 10', 'Jul 11 – Aug 24']

export default function Dashboard({ milestones, stats, onToggle, setView }: Props) {
  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
          Good work, Leo.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Overall Progress', value: `${stats.overall_pct}%`, color: 'var(--accent)' },
            { label: 'Days Remaining', value: stats.days_remaining, color: 'var(--accent3)' },
            { label: 'Study Streak', value: `${stats.streak} days`, color: 'var(--accent2)' },
          ].map(card => (
            <div key={card.label} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '1.25rem',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {card.label}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: card.color, fontFamily: 'monospace' }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[1, 2, 3].map(phase => {
          const phaseMilestones = milestones.filter(m => m.phase === phase)
          const done = phaseMilestones.filter(m => m.completed).length
          const total = phaseMilestones.length
          const pct = total > 0 ? Math.round((done / total) * 100) : 0
          const color = phaseColors[phase]

          return (
            <div key={phase} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.15rem' }}>
                    {phaseLabels[phase]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{phaseDates[phase]}</div>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color }}>
                  {pct}%
                </div>
              </div>

              <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', marginBottom: '0.75rem' }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: color, borderRadius: '3px',
                  transition: 'width 0.5s ease',
                }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {phaseMilestones.slice(0, 3).map(m => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <input
                      type="checkbox"
                      checked={m.completed}
                      onChange={e => onToggle(m.id, e.target.checked)}
                      style={{ accentColor: color, width: '14px', height: '14px', cursor: 'pointer' }}
                    />
                    <span style={{
                      fontSize: '0.8rem',
                      color: m.completed ? 'var(--muted)' : 'var(--text)',
                      textDecoration: m.completed ? 'line-through' : 'none',
                    }}>
                      {m.title}
                    </span>
                  </div>
                ))}
                {phaseMilestones.length > 3 && (
                  <button
                    onClick={() => setView('milestones')}
                    style={{
                      background: 'none', border: 'none', color,
                      fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left',
                      padding: '0.25rem 0', marginTop: '0.25rem',
                    }}
                  >
                    +{phaseMilestones.length - 3} more →
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
