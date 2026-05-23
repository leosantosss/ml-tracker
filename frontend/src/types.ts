export interface Milestone {
  id: number
  phase: number
  week_label: string
  title: string
  description: string
  due_date: string | null
  completed: boolean
  completed_at: string | null
}

export interface Checkin {
  id: number
  date: string
  studied: boolean
  hours: number | null
  notes: string
  created_at: string
}

export interface Project {
  id: number
  phase: number
  name: string
  description: string
  status: 'not_started' | 'in_progress' | 'shipped' | 'on_github'
  github_url: string | null
  demo_url: string | null
}

export interface Resource {
  id: number
  phase: number
  title: string
  url: string | null
  type: 'course' | 'video' | 'competition' | 'paper'
  completed: boolean
}

export interface Stats {
  overall_pct: number
  phase_pcts: Record<number, number>
  streak: number
  days_remaining: number
  total_milestones: number
  completed_milestones: number
}
