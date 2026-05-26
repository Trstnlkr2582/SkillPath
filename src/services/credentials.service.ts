import api from './api'
import { Credential } from '../types'

export const credentialsService = {
  async getMine(): Promise<Credential[]> {
    const { data } = await api.get('/credentials/me')
    return data.data.credentials ?? data.data
  },

  async getById(id: string): Promise<Credential> {
    const { data } = await api.get(`/credentials/${id}`)
    return data.data.credential ?? data.data
  },

  async verify(code: string): Promise<Credential> {
    const { data } = await api.get(`/credentials/verify/${code}`)
    return data.data.credential ?? data.data
  },
}
