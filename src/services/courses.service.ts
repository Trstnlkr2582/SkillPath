import api from './api'
import { Course } from '../types'

export const coursesService = {
  async getAll(params?: { status?: string; category?: string; difficulty?: string }): Promise<Course[]> {
    const { data } = await api.get('/courses', { params })
    return data.data.courses ?? data.data
  },

  async getMyCourses(): Promise<Course[]> {
    const { data } = await api.get('/courses/me')
    return data.data.courses ?? data.data
  },

  async getById(id: string): Promise<Course> {
    const { data } = await api.get(`/courses/${id}`)
    return data.data.course ?? data.data
  },

  async enroll(courseId: string): Promise<void> {
    await api.post(`/courses/${courseId}/enroll`)
  },

  async unenroll(courseId: string): Promise<void> {
    await api.delete(`/courses/${courseId}/enroll`)
  },

  async getStudents(courseId: string): Promise<any[]> {
    const { data } = await api.get(`/courses/${courseId}/students`)
    return data.data.students ?? data.data
  },

  async create(payload: Partial<Course>): Promise<Course> {
    const { data } = await api.post('/courses', payload)
    return data.data.course ?? data.data
  },

  async update(id: string, payload: Partial<Course>): Promise<Course> {
    const { data } = await api.put(`/courses/${id}`, payload)
    return data.data.course ?? data.data
  },

  async changeStatus(id: string, status: string): Promise<void> {
    await api.put(`/courses/${id}/status`, { status })
  },
}
