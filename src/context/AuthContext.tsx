import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import * as Sentry from '@sentry/react-native'
import { auth } from '../config/firebase'
import { authService } from '../services/auth.service'
import { analytics } from '../services/analytics.service'
import { User, UserRole } from '../types'

type OnboardingPayload = Parameters<typeof authService.completeOnboarding>[0]

interface AuthContextType {
  user: User | null
  role: UserRole | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ needsOnboarding: boolean }>
  register: (email: string, password: string, onboarding: OnboardingPayload) => Promise<void>
  completeOnboarding: (payload: OnboardingPayload) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await authService.getMe()
          setUser(userData)
          Sentry.setUser({ id: userData.uid, email: userData.email })
        } catch {
          setUser(null)
          Sentry.setUser(null)
        }
      } else {
        setUser(null)
        Sentry.setUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password)
    setUser(result.user)
    Sentry.setUser({ id: result.user.uid, email: result.user.email })
    analytics.login(result.user.uid, result.user.role)
    return { needsOnboarding: result.needsOnboarding }
  }

  const register = async (email: string, password: string, onboarding: OnboardingPayload) => {
    // Registrar en Firebase + crear usuario en backend
    const result = await authService.register(email, password)
    // Completar onboarding en la misma operación para que setUser
    // se llame una sola vez con onboarding_completed: true
    const updatedUser = await authService.completeOnboarding(onboarding)
    setUser(updatedUser)
    Sentry.setUser({ id: updatedUser.uid, email: updatedUser.email })
    analytics.register(updatedUser.uid)
    analytics.completeOnboarding(updatedUser.role)
  }

  const completeOnboarding = async (payload: Parameters<typeof authService.completeOnboarding>[0]) => {
    const updatedUser = await authService.completeOnboarding(payload)
    setUser(updatedUser)
    analytics.completeOnboarding(updatedUser.role)
  }

  const logout = async () => {
    await authService.logout()
    analytics.logout()
    Sentry.setUser(null)
    setUser(null)
  }

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email)
  }

  const refreshUser = async () => {
    const userData = await authService.getMe()
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        loading,
        login,
        register,
        completeOnboarding,
        logout,
        forgotPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
