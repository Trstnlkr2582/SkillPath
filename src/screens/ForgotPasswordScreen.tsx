import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import { useAuth } from '../context/AuthContext'

export default function ForgotPasswordScreen({ navigation }: any) {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SkillPath</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.container}>
        {!sent ? (
          <View style={styles.card}>
            {/* Icon */}
            <View style={styles.iconBox}>
              <Ionicons name="lock-closed-outline" size={28} color={colors.primary} />
            </View>

            <Text style={styles.title}>Recuperar contraseña</Text>
            <Text style={styles.subtitle}>
              No te preocupes, sucede. Introduce tu correo electrónico y te enviaremos un enlace
              seguro para restablecer tu acceso.
            </Text>

            {/* Email Field */}
            <View style={styles.field}>
              <Text style={styles.label}>Correo electrónico</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ejemplo@skillpath.com"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, (!email || loading) && styles.primaryButtonDisabled]}
              activeOpacity={0.85}
              disabled={!email || loading}
              onPress={async () => {
                setLoading(true)
                try {
                  await forgotPassword(email)
                  setSent(true)
                } catch (err: any) {
                  Alert.alert('Error', err.message)
                } finally {
                  setLoading(false)
                }
              }}
            >
              {loading
                ? <ActivityIndicator color={colors.white} />
                : <Text style={styles.primaryButtonText}>Enviar enlace</Text>
              }
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={16} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={[styles.iconBox, styles.iconBoxSuccess]}>
              <Ionicons name="checkmark-circle-outline" size={32} color={colors.successText} />
            </View>
            <Text style={styles.title}>Correo enviado</Text>
            <Text style={styles.subtitle}>
              Hemos enviado un enlace de recuperación a{' '}
              <Text style={styles.emailHighlight}>{email}</Text>. Revisa tu bandeja de entrada.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 56,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: { padding: spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary },
  container: { flex: 1, padding: spacing.md, paddingTop: 24 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconBoxSuccess: { backgroundColor: colors.activeBg },
  title: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary, marginBottom: 10 },
  subtitle: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22, marginBottom: spacing.lg },
  emailHighlight: { color: colors.primary, fontWeight: '500' },
  field: { gap: spacing.xs, marginBottom: spacing.lg },
  label: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginRight: spacing.sm },
  input: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  primaryButtonDisabled: { backgroundColor: colors.surface },
  primaryButtonText: { color: colors.white, fontSize: fontSize.body, fontWeight: '600' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  secondaryButtonText: { fontSize: fontSize.body, color: colors.primary, fontWeight: '500' },
})
