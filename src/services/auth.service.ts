import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import api from './api'
import { User } from '../types'

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; needsOnboarding: boolean }> {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    const token = await credential.user.getIdToken()
    const { data } = await api.post('/auth/login', {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data.data
  },

  async register(email: string, password: string): Promise<{ user: User; needsOnboarding: boolean }> {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    const token = await credential.user.getIdToken()
    const { data } = await api.post('/auth/login', {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data.data
  },

  async completeOnboarding(payload: {
    name: string
    role: 'student' | 'professor'
    career?: string
    faculty?: string
    semester?: number
    department?: string
    specializations?: string[]
  }): Promise<User> {
    const { data } = await api.post('/auth/onboarding', payload)
    return data.data.user
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } finally {
      await signOut(auth)
    }
  },

  async forgotPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email)
  },

  async getMe(): Promise<User> {
    const { data } = await api.get('/auth/me')
    return data.data.user
  },
}
