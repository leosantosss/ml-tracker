import { useState } from 'react'
import { GitBranch, ExternalLink } from 'lucide-react'
import type { Project } from '../types'

interface Props {
  projects: Project[]
  onUpdate: (id: number, data: Partial<Pick<Project, 'status' | 'github_url' | 'demo_url'>>) => void
}

const columns: { id: Project['status']; label: string; color: string }[] = [
  { id: 'not_started', label: 'Not Started', color: 'var(--muted)' },
  { id: 'in_progress', label: 'In Progress', color: 'var(--accent3)' },
  { id: 'shipped', label: 'Shipped', color: 'var(--accent2)' },
  { id: 'on_github', label: 'On GitHub', color: 'var(--accent)' },
]

function ProjectCard({ project, onUpdate }: { project: Project; onUpdate: Props['onUpdate'] }) {
  const [editing, setEditing] = useState(false)
  const [github, setGithub] = useState(project.github_url ?? '')
  const [demo, setDemo] = useState(project.demo_url ?? '')

  const save = () => {
    onUpdate(project.id, { github_url: github || null, demo_url: demo || null })
    setEditing(false)
  }

  return (
    <div style={{
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: '8px', padding: '0.875rem',
    }}>
      <div style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{project.name}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{project.description}</div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        {columns.map(col => (
          <button
            key={col.id}
            onClick={() => onUpdate(project.id, { status: col.id })}
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              border: `1px solid ${project.status === col.id ? col.color : 'var(--border)'}`,
              background: project.status === col.id ? col.color + '22' : 'transparent',
              color: project.status === col.id ? col.color : 'var(--muted)',
              fontSize: '0.7rem', cursor: 'pointer',
            }}
          >
            {col.label}
          </button>
        ))}
      </div>

      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <input
            placeholder="GitHub URL"
            value={github}
            onChange={e => setGithub(e.target.value)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '0.3rem 0.5rem',
              color: 'var(--text)', fontSize: '0.75rem', width: '100%',
            }}
          />
          <input
            placeholder="Demo URL"
            value={demo}
            onChange={e => setDemo(e.target.value)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '0.3rem 0.5rem',
              color: 'var(--text)', fontSize: '0.75rem', width: '100%',
            }}
          />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={save} style={{ padding: '0.25rem 0.6rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Save</button>
            <button onClick={() => setEditing(false)} style={{ padding: '0.25rem 0.6rem', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}><GitBranch size={14} /></a>}
          {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}><ExternalLink size={14} /></a>}
          <button onClick={() => setEditing(true)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.7rem', cursor: 'pointer' }}>
            + Add links
          </button>
        </div>
      )}
    </div>
  )
}

export default function ProjectBoard({ projects, onUpdate }: Props) {
  return (
    <div style={{ maxWidth: '900px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Projects</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  )
}
