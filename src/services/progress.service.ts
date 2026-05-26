import api from './api'
import { Progress } from '../types'

export const progressService = {
  async getMyProgress(): Promise<Progress[]> {
    const { data } = await api.get('/progress/me')
    return data.data.progress ?? data.data
  },

  async getCourseProgress(courseId: string): Promise<Progress> {
    const { data } = await api.get(`/progress/me/${courseId}`)
    return data.data.progress ?? data.data
  },

  async completeLesson(courseId: string, lessonId: string): Promise<Progress> {
    const { data } = await api.post(`/progress/course/${courseId}/lesson/${lessonId}/complete`)
    return data.data.progress ?? data.data
  },

  async savePosition(courseId: string, lessonId: string, positionSeconds: number): Promise<void> {
    await api.put(`/progress/course/${courseId}/lesson/${lessonId}/save`, { position_seconds: positionSeconds })
  },

  async getCourseProgressAll(courseId: string): Promise<Progress[]> {
    const { data } = await api.get(`/progress/course/${courseId}`)
    return data.data.progress ?? data.data
  },

  async getStudentProgress(userId: string): Promise<Progress[]> {
    const { data } = await api.get(`/progress/student/${userId}`)
    return data.data.progress ?? data.data
  },
}
