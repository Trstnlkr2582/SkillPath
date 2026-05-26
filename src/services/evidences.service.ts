import api from './api'
import { Evidence } from '../types'

export const evidencesService = {
  async submit(payload: {
    course_id: string
    task_id: string
    competency_level: string
    links?: Array<{ url: string; name: string }>
    files?: any[]
  }): Promise<Evidence> {
    const formData = new FormData()
    formData.append('course_id', payload.course_id)
    formData.append('task_id', payload.task_id)
    formData.append('competency_level', payload.competency_level)
    if (payload.links) formData.append('links', JSON.stringify(payload.links))
    if (payload.files) {
      payload.files.forEach((file: any) => {
        formData.append('files', file)
      })
    }
    const { data } = await api.post('/evidences', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data.evidence ?? data.data
  },

  async getMyEvidences(): Promise<Evidence[]> {
    const { data } = await api.get('/evidences/me')
    return data.data.evidences ?? data.data
  },

  async getByTask(taskId: string): Promise<Evidence[]> {
    const { data } = await api.get(`/evidences/task/${taskId}`)
    return data.data.evidences ?? data.data
  },

  async review(evidenceId: string, payload: {
    status: 'approved' | 'rejected' | 'in_correction'
    score: number
    reviewer_comment: string
  }): Promise<Evidence> {
    const { data } = await api.put(`/evidences/${evidenceId}/review`, payload)
    return data.data.evidence ?? data.data
  },
}
