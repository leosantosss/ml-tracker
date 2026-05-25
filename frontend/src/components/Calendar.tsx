import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import type { Milestone, Resource } from '../types'

interface Props {
  milestones: Milestone[]
  resources: Resource[]
}

const PHASE_RANGES = [
  { phase: 1, start: new Date(2026, 4, 23), end: new Date(2026, 5, 1),  color: '#00ff88', label: 'ML Foundations' },
  { phase: 2, start: new Date(2026, 5, 2),  end: new Date(2026, 6, 10), color: '#7c3aed', label: 'Deep Learning + PyTorch' },
  { phase: 3, start: new Date(2026, 6, 11), end: new Date(2026, 7, 24), color: '#0ea5e9', label: 'Computer Vision + Capstone' },
]

const GOAL_DATE = new Date(2026, 7, 24)
const START_DATE = new Date(2026, 4, 23)

interface DayPlan {
  type: string
  color: string
  focus: string
  hours: string
  tasks: string[]
  resourceTitles: string[]
}

function getPhase(date: Date) {
  return PHASE_RANGES.find(p => date >= p.start && date <= p.end) ?? null
}

function getDayPlan(date: Date): DayPlan | null {
  const phase = getPhase(date)
  if (!phase) return null

  const day = date.getDay()
  const isCourseDay = day === 1 || day === 3 || day === 5
  const isBuildDay = day === 2 || day === 4
  const isWeekend = day === 0 || day === 6

  if (phase.phase === 1) {
    if (isCourseDay) return {
      type: 'Courses', color: phase.color, focus: 'Andrew Ng ML Specialization',
      hours: '3–4 hours',
      tasks: [
        'Watch lectures at 1.5× speed',
        'Take notes on key concepts',
        'Complete all quiz questions',
        'Focus: gradient descent, regularization, bias-variance tradeoff',
      ],
      resourceTitles: ['Andrew Ng ML Specialization'],
    }
    if (isBuildDay) return {
      type: 'Practice', color: phase.color, focus: 'Kaggle Pandas Micro-course',
      hours: '2–3 hours',
      tasks: [
        'Work through Kaggle Pandas exercises',
        'Practice DataFrame operations',
        'Try the exercise notebooks hands-on',
        'Connect pandas concepts to what you learned in Ng',
      ],
      resourceTitles: ['Kaggle Pandas micro-course'],
    }
    if (isWeekend) return {
      type: 'Review', color: phase.color, focus: 'Consolidate the week',
      hours: '4–6 hours',
      tasks: [
        'Review your notes from the week',
        'Re-watch any confusing lectures',
        'Try implementing gradient descent from scratch',
        'Read ahead on upcoming topics',
      ],
      resourceTitles: ['Andrew Ng ML Specialization', 'Kaggle Pandas micro-course'],
    }
  }

  if (phase.phase === 2) {
    if (isCourseDay) return {
      type: 'Courses', color: phase.color, focus: 'PyTorch + fast.ai',
      hours: '3–4 hours',
      tasks: [
        'PyTorch tutorials — tensors, autograd, neural networks',
        'fast.ai lessons 1–5 — practical deep learning',
        'Watch Karpathy micrograd video (first course week)',
        'Run every code example yourself, don\'t just watch',
      ],
      resourceTitles: ['PyTorch official tutorials', 'fast.ai Practical Deep Learning', 'Karpathy micrograd'],
    }
    if (isBuildDay) return {
      type: 'Build', color: phase.color, focus: 'Projects — push to GitHub',
      hours: '3–4 hours',
      tasks: [
        'Week 3–4: MNIST CNN from scratch in PyTorch',
        'Week 5–6: Kaggle House Prices pipeline',
        'Week 7: Enter a Kaggle Playground competition',
        'Commit and push every session — no dead sessions',
      ],
      resourceTitles: ['PyTorch official tutorials'],
    }
    if (isWeekend) return {
      type: 'Kaggle', color: phase.color, focus: 'Competition + Papers',
      hours: '4–6 hours',
      tasks: [
        'Work on your Kaggle Playground competition submission',
        'Explore top public notebooks for ideas',
        'Read one ML blog post or paper section',
        'Review your project code and clean it up',
      ],
      resourceTitles: ['Kaggle Playground competitions'],
    }
  }

  if (phase.phase === 3) {
    if (isCourseDay) return {
      type: 'Courses', color: phase.color, focus: 'fast.ai 5–8 + Capstone',
      hours: '3–4 hours',
      tasks: [
        'fast.ai lessons 5–8 — NLP, tabular, collaborative filtering',
        'Apply lessons directly to your capstone dataset',
        'Fine-tune ResNet or EfficientNet on custom images',
        'Document everything as you go for your README',
      ],
      resourceTitles: ['fast.ai Practical Deep Learning (lessons 5-8)'],
    }
    if (isBuildDay) return {
      type: 'Build', color: phase.color, focus: 'Capstone — Ship it',
      hours: '3–4 hours',
      tasks: [
        'Week 8–10: Train and evaluate your CV model',
        'Week 11: Wrap model in FastAPI backend',
        'Week 11: Dockerize the full app',
        'Week 12: Deploy live, get a public URL',
        'Week 13: Polish all READMEs + screenshots',
      ],
      resourceTitles: ['fast.ai Practical Deep Learning (lessons 5-8)'],
    }
    if (isWeekend) return {
      type: 'Papers', color: phase.color, focus: 'Read the classics',
      hours: '4–6 hours',
      tasks: [
        'Read "Attention Is All You Need" (transformer paper)',
        'Read the original ResNet paper',
        'Take notes on architecture decisions and why they matter',
        'Polish GitHub — clean READMEs, add screenshots, live demo links',
      ],
      resourceTitles: ['Attention Is All You Need', 'Deep Residual Learning for Image Recognition'],
    }
  }

  return null
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function getMilestonesForDay(date: Date, milestones: Milestone[]) {
  return milestones.filter(m => m.due_date && isSameDay(new Date(m.due_date + 'T00:00:00'), date))
}

export default function Calendar({ milestones, resources }: Props) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState<Date | null>(today)

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]

  const selectedPhase = selected ? getPhase(selected) : null
  const selectedPlan = selected ? getDayPlan(selected) : null
  const selectedMilestones = selected ? getMilestonesForDay(selected, milestones) : []
  const selectedResources = selectedPlan
    ? resources.filter(r => selectedPlan.resourceTitles.includes(r.title))
    : []

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Study Calendar</h1>
        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
          {Math.max(0, Math.ceil((GOAL_DATE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))} days to Aug 24
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>

        {/* Calendar */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>

          {/* Month nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}>
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--muted)', padding: '6px 0', fontWeight: 600, letterSpacing: '0.05em' }}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {cells.map((date, i) => {
              if (!date) return <div key={i} />

              const phase = getPhase(date)
              const plan = getDayPlan(date)
              const isToday = isSameDay(date, today)
              const isSelected = selected && isSameDay(date, selected)
              const dayMilestones = getMilestonesForDay(date, milestones)
              const isPast = date < today && !isToday
              const isInRange = date >= START_DATE && date <= GOAL_DATE

              return (
                <div
                  key={i}
                  onClick={() => isInRange && setSelected(date)}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '8px',
                    cursor: isInRange ? 'pointer' : 'default',
                    background: isSelected
                      ? (phase?.color ?? 'var(--accent)') + '20'
                      : isToday
                      ? (phase?.color ?? 'var(--accent)') + '10'
                      : 'transparent',
                    border: `1px solid ${isSelected
                      ? (phase?.color ?? 'var(--accent)') + '80'
                      : isToday
                      ? (phase?.color ?? 'var(--accent)') + '60'
                      : 'transparent'}`,
                    opacity: !isInRange && !isToday ? 0.25 : isPast ? 0.5 : 1,
                    minHeight: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.1s ease',
                  }}
                >
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: isToday ? 700 : 500,
                    color: isToday ? (phase?.color ?? 'var(--accent)') : isPast && isInRange ? 'var(--muted)' : 'var(--text)',
                    fontFamily: 'monospace',
                  }}>
                    {date.getDate()}
                  </span>

                  {phase && plan && (
                    <span style={{
                      fontSize: '0.6rem',
                      padding: '2px 5px',
                      borderRadius: '3px',
                      background: phase.color + '25',
                      color: phase.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontWeight: 600,
                      alignSelf: 'flex-start',
                    }}>
                      {plan.type}
                    </span>
                  )}

                  {phase && plan && (
                    <span style={{
                      fontSize: '0.6rem',
                      color: 'var(--muted)',
                      lineHeight: 1.3,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const,
                    }}>
                      {plan.focus}
                    </span>
                  )}

                  {dayMilestones.length > 0 && (
                    <div style={{ display: 'flex', gap: '2px', marginTop: 'auto' }}>
                      {dayMilestones.map((_, idx) => (
                        <div key={idx} style={{ width: '5px', height: '5px', borderRadius: '50%', background: phase?.color ?? 'var(--accent)' }} />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
            {PHASE_RANGES.map(p => (
              <div key={p.phase} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: p.color + '40', border: `1px solid ${p.color}` }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Phase {p.phase} — {p.label}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text)' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Milestone due</span>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', position: 'sticky', top: '2rem' }}>
          {selected && selectedPlan ? (
            <>
              {/* Header */}
              <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace', marginBottom: '0.4rem' }}>
                  {selected.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                {selectedPhase && (
                  <div style={{ fontSize: '0.75rem', color: selectedPhase.color, fontWeight: 600, marginBottom: '0.5rem' }}>
                    Phase {selectedPhase.phase} — {selectedPhase.label}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                    background: selectedPlan.color + '20',
                    border: `1px solid ${selectedPlan.color}40`,
                    color: selectedPlan.color,
                    fontSize: '0.8rem', fontWeight: 700,
                  }}>
                    {selectedPlan.type} Day
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                    fontSize: '0.8rem', fontFamily: 'monospace',
                  }}>
                    ⏱ {selectedPlan.hours}
                  </div>
                </div>
              </div>

              {/* Focus */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Focus</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{selectedPlan.focus}</div>
              </div>

              {/* Tasks */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>What to do</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedPlan.tasks.map((task, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedPlan.color, marginTop: '6px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.825rem', color: 'var(--text)', lineHeight: 1.5 }}>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              {selectedResources.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Resources</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedResources.map(r => (
                      <a
                        key={r.id}
                        href={r.url ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '0.5rem 0.75rem',
                          background: 'var(--bg)',
                          borderRadius: '6px',
                          border: `1px solid ${r.completed ? selectedPlan.color + '40' : 'var(--border)'}`,
                          color: r.completed ? 'var(--muted)' : 'var(--text)',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ textDecoration: r.completed ? 'line-through' : 'none' }}>{r.title}</span>
                        {r.url && <ExternalLink size={12} style={{ color: 'var(--muted)', flexShrink: 0 }} />}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Milestones due */}
              {selectedMilestones.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Due today</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedMilestones.map(m => (
                      <div key={m.id} style={{
                        padding: '0.5rem 0.75rem',
                        background: 'var(--bg)',
                        borderRadius: '6px',
                        border: `1px solid ${m.completed ? '#00ff8840' : '#ff444440'}`,
                        fontSize: '0.8rem',
                        color: m.completed ? 'var(--muted)' : 'var(--text)',
                        textDecoration: m.completed ? 'line-through' : 'none',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                      }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.completed ? '#00ff88' : '#ff4444', flexShrink: 0 }} />
                        {m.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : selected ? (
            <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
              This day is outside your roadmap window (May 23 – Aug 24).
            </div>
          ) : (
            <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
              Click any day to see your study plan.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
