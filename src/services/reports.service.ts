import api from './api'

export const reportsService = {
  async getPlatform(): Promise<any> {
    const { data } = await api.get('/reports/platform')
    return data.data
  },

  async getCourse(courseId: string): Promise<any> {
    const { data } = await api.get(`/reports/course/${courseId}`)
    return data.data
  },

  async getStudent(userId: string): Promise<any> {
    const { data } = await api.get(`/reports/student/${userId}`)
    return data.data
  },
}
