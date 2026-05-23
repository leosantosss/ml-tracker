import { useState, useEffect } from 'react'
import { getMilestones, getStats, getProjects, getResources, toggleMilestone, toggleResource, updateProject, upsertCheckin } from './api'
import type { Milestone, Stats, Project, Resource } from './types'
import Dashboard from './components/Dashboard'
import MilestoneList from './components/MilestoneList'
import ProjectBoard from './components/ProjectBoard'
import ResourcesList from './components/ResourcesList'
import CheckinModal from './components/CheckinModal'
import Sidebar from './components/Sidebar'

export type View = 'dashboard' | 'milestones' | 'projects' | 'resources'

function App() {
  const [view, setView] = useState<View>('dashboard')
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [checkinOpen, setCheckinOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getMilestones(), getStats(), getProjects(), getResources()])
      .then(([m, s, p, r]) => {
        setMilestones(m)
        setStats(s)
        setProjects(p)
        setResources(r)
      })
      .finally(() => setLoading(false))
  }, [])

  const refreshStats = () => getStats().then(setStats)

  const handleToggleMilestone = async (id: number, completed: boolean) => {
    const updated = await toggleMilestone(id, completed)
    setMilestones(prev => prev.map(m => m.id === id ? updated : m))
    refreshStats()
  }

  const handleToggleResource = async (id: number, completed: boolean) => {
    const updated = await toggleResource(id, completed)
    setResources(prev => prev.map(r => r.id === id ? updated : r))
  }

  const handleUpdateProject = async (id: number, data: Partial<Pick<Project, 'status' | 'github_url' | 'demo_url'>>) => {
    const updated = await updateProject(id, data)
    setProjects(prev => prev.map(p => p.id === id ? updated : p))
  }

  const handleCheckin = async (data: { date: string; studied: boolean; hours?: number; notes?: string }) => {
    await upsertCheckin(data)
    refreshStats()
    setCheckinOpen(false)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)' }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar view={view} setView={setView} stats={stats} onCheckin={() => setCheckinOpen(true)} />

      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {view === 'dashboard' && (
          <Dashboard milestones={milestones} stats={stats} onToggle={handleToggleMilestone} setView={setView} />
        )}
        {view === 'milestones' && (
          <MilestoneList milestones={milestones} onToggle={handleToggleMilestone} />
        )}
        {view === 'projects' && (
          <ProjectBoard projects={projects} onUpdate={handleUpdateProject} />
        )}
        {view === 'resources' && (
          <ResourcesList resources={resources} onToggle={handleToggleResource} />
        )}
      </main>

      {checkinOpen && (
        <CheckinModal onSubmit={handleCheckin} onClose={() => setCheckinOpen(false)} />
      )}
    </div>
  )
}

export default App
