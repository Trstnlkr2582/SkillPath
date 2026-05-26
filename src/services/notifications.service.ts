import api from './api'
import { Notification } from '../types'

export const notificationsService = {
  async getAll(): Promise<Notification[]> {
    const { data } = await api.get('/notifications')
    return data.data.notifications ?? data.data
  },

  async markRead(id: string): Promise<void> {
    await api.put(`/notifications/${id}/read`)
  },

  async markAllRead(): Promise<void> {
    await api.put('/notifications/read-all')
  },
}
