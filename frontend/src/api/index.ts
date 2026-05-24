import axios from 'axios'
import type { Milestone, Checkin, Project, Resource, Stats } from '../types'

const BASE = import.meta.env.VITE_API_URL ?? ''
const api = axios.create({ baseURL: `${BASE}/api` })

export const getMilestones = () => api.get<Milestone[]>('/milestones').then(r => r.data)
export const toggleMilestone = (id: number, completed: boolean) =>
  api.patch<Milestone>(`/milestones/${id}`, { completed }).then(r => r.data)

export const getCheckins = () => api.get<Checkin[]>('/checkins').then(r => r.data)
export const upsertCheckin = (data: { date: string; studied: boolean; hours?: number; notes?: string }) =>
  api.post<Checkin>('/checkins', data).then(r => r.data)

export const getProjects = () => api.get<Project[]>('/projects').then(r => r.data)
export const updateProject = (id: number, data: Partial<Pick<Project, 'status' | 'github_url' | 'demo_url'>>) =>
  api.patch<Project>(`/projects/${id}`, data).then(r => r.data)

export const getResources = () => api.get<Resource[]>('/resources').then(r => r.data)
export const toggleResource = (id: number, completed: boolean) =>
  api.patch<Resource>(`/resources/${id}`, { completed }).then(r => r.data)

export const getStats = () => api.get<Stats>('/stats').then(r => r.data)
