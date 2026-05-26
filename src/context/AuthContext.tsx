import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { authService } from '../services/auth.service'
import { User, UserRole } from '../types'

interface AuthContextType {
  user: User | null
  role: UserRole | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ needsOnboarding: boolean }>
  register: (email: string, password: string) => Promise<{ needsOnboarding: boolean }>
  completeOnboarding: (payload: Parameters<typeof authService.completeOnboarding>[0]) => Promise<void>
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
        } catch {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password)
    setUser(result.user)
    return { needsOnboarding: result.needsOnboarding }
  }

  const register = async (email: string, password: string) => {
    const result = await authService.register(email, password)
    setUser(result.user)
    return { needsOnboarding: result.needsOnboarding }
  }

  const completeOnboarding = async (payload: Parameters<typeof authService.completeOnboarding>[0]) => {
    const updatedUser = await authService.completeOnboarding(payload)
    setUser(updatedUser)
  }

  const logout = async () => {
    await authService.logout()
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
