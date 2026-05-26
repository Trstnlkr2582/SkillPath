import api from './api'
import { User } from '../types'

export const usersService = {
  async getMe(): Promise<User> {
    const { data } = await api.get('/users/me')
    return data.data.user ?? data.data
  },

  async updateMe(payload: Partial<User>): Promise<User> {
    const { data } = await api.put('/users/me', payload)
    return data.data.user ?? data.data
  },

  async getAll(params?: { page?: number; limit?: number; role?: string }): Promise<{ users: User[]; total: number }> {
    const { data } = await api.get('/users', { params })
    return { users: data.data.users ?? data.data, total: data.pagination?.total ?? 0 }
  },

  async getById(uid: string): Promise<User> {
    const { data } = await api.get(`/users/${uid}`)
    return data.data.user ?? data.data
  },
}
