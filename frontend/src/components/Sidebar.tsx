import { LayoutDashboard, CheckSquare, FolderKanban, BookOpen, ClipboardCheck, CalendarDays } from 'lucide-react'
import type { View } from '../App'
import type { Stats } from '../types'

interface Props {
  view: View
  setView: (v: View) => void
  stats: Stats | null
  onCheckin: () => void
}

const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'milestones', label: 'Milestones', icon: <CheckSquare size={18} /> },
  { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
  { id: 'resources', label: 'Resources', icon: <BookOpen size={18} /> },
  { id: 'calendar', label: 'Calendar', icon: <CalendarDays size={18} /> },
]

export default function Sidebar({ view, setView, stats, onCheckin }: Props) {
  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      gap: '0.5rem',
      position: 'sticky',
      top: 0,
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
          ML TRACKER
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
          Summer 2026
        </div>
      </div>

      {stats && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Overall Progress
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>
            {stats.overall_pct}%
          </div>
          <div style={{
            height: '4px', background: 'var(--border)', borderRadius: '2px', marginTop: '0.5rem'
          }}>
            <div style={{
              height: '100%',
              width: `${stats.overall_pct}%`,
              background: 'var(--accent)',
              borderRadius: '2px',
              transition: 'width 0.5s ease',
            }} />
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
            {stats.completed_milestones}/{stats.total_milestones} milestones
          </div>
        </div>
      )}

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.6rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              background: view === item.id ? 'rgba(0,255,136,0.1)' : 'transparent',
              color: view === item.id ? 'var(--accent)' : 'var(--muted)',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.15s ease',
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        {stats && (
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>{stats.days_remaining}</span> days to Aug 24
            {stats.streak > 0 && (
              <span style={{ marginLeft: '0.75rem' }}>🔥 {stats.streak}</span>
            )}
          </div>
        )}
        <button
          onClick={onCheckin}
          style={{
            width: '100%', padding: '0.6rem',
            background: 'var(--accent2)', color: 'white',
            border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '0.8rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}
        >
          <ClipboardCheck size={15} />
          Log Today
        </button>
      </div>
    </aside>
  )
}
