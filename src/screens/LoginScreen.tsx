import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import { useAuth } from '../context/AuthContext'

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* TopAppBar */}
      <View style={styles.topBar}>
        <Text style={styles.brandText}>SkillPath</Text>
        <Ionicons name="school-outline" size={24} color={colors.primary} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <View style={styles.card}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Bienvenido de nuevo</Text>
            <Text style={styles.cardSubtitle}>
              Ingresa tus credenciales institucionales para continuar
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Correo electrónico institucional</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="nombre@institucion.edu"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.field}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Contraseña</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotLink}>Olvidé mi contraseña</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors.placeholder}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Keep Logged In */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setKeepLoggedIn(!keepLoggedIn)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, keepLoggedIn && styles.checkboxActive]}>
                {keepLoggedIn && <Ionicons name="checkmark" size={10} color={colors.white} />}
              </View>
              <Text style={styles.checkboxLabel}>Mantener sesión iniciada</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              activeOpacity={0.85}
              disabled={loading}
              onPress={async () => {
                if (!email || !password) {
                  Alert.alert('Campos requeridos', 'Ingresa tu correo y contraseña.')
                  return
                }
                setLoading(true)
                try {
                  await login(email, password)
                  // navigator.tsx redirige automáticamente (por rol o a Onboarding)
                } catch (err: any) {
                  Alert.alert('Error al iniciar sesión', err.message)
                } finally {
                  setLoading(false)
                }
              }}
            >
              {loading
                ? <ActivityIndicator color={colors.white} />
                : <Text style={styles.loginButtonText}>Entrar</Text>
              }
            </TouchableOpacity>
          </View>

          {/* Assistance */}
          <View style={styles.assistance}>
            <Text style={styles.assistanceText}>¿Necesitas asistencia técnica?</Text>
            <TouchableOpacity>
              <Text style={styles.assistanceLink}>Centro de Ayuda</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Legal Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacidad</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>·</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Términos</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>·</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Contacto</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerCopy}>
          © 2024 SkillPath. Sistema de Gestión de Aprendizaje.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 64,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 25,
  },
  cardHeader: {
    marginBottom: spacing.xl,
  },
  cardTitle: {
    fontSize: fontSize.headingMd,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  cardSubtitle: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  field: {
    gap: spacing.xs,
  },
  fieldLabel: {
    fontSize: fontSize.label,
    fontWeight: '500',
    color: colors.textMuted,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    fontSize: fontSize.bodySm,
    color: colors.primary,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 57,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.textPrimary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  assistance: {
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
    gap: 4,
  },
  assistanceText: {
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
  assistanceLink: {
    fontSize: fontSize.body,
    color: colors.primary,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 12,
    paddingTop: spacing.sm,
    gap: 6,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerLink: {
    fontSize: fontSize.bodySm,
    color: colors.textMuted,
  },
  footerSeparator: {
    fontSize: fontSize.bodySm,
    color: colors.border,
  },
  footerCopy: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
})
