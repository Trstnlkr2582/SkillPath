import api from './api'
import { Lesson } from '../types'

export const lessonsService = {
  async getByCourse(courseId: string, level?: string): Promise<Lesson[]> {
    const { data } = await api.get(`/courses/${courseId}/lessons`, {
      params: level ? { level } : undefined,
    })
    return data.data.lessons ?? data.data
  },

  async getById(lessonId: string): Promise<Lesson> {
    const { data } = await api.get(`/lessons/${lessonId}`)
    return data.data.lesson ?? data.data
  },
}
