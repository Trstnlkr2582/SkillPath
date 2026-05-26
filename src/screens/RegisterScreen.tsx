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

const PROGRAMS = [
  'Ingeniería de Sistemas',
  'Diseño de Producto',
  'Administración de Empresas',
  'Psicología',
  'Derecho',
  'Medicina',
]

export default function RegisterScreen({ navigation }: any) {
  const { register, completeOnboarding } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [program, setProgram] = useState('')
  const [showPrograms, setShowPrograms] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Registro de Estudiante</Text>
          <Text style={styles.subtitle}>Completa el formulario para crear tu perfil académico.</Text>

          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.field}>
              <Text style={styles.label}>Nombre Completo</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Ej. Juan Pérez"
                  placeholderTextColor={colors.placeholder}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Institutional Email */}
            <View style={styles.field}>
              <Text style={styles.label}>Correo Institucional</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="usuario@universidad.edu"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Faculty / Program */}
            <View style={styles.field}>
              <Text style={styles.label}>Facultad / Programa Académico</Text>
              <TouchableOpacity
                style={styles.selectWrapper}
                onPress={() => setShowPrograms(!showPrograms)}
                activeOpacity={0.7}
              >
                <Text style={[styles.selectText, !program && styles.selectPlaceholder]}>
                  {program || 'Selecciona tu programa'}
                </Text>
                <Ionicons
                  name={showPrograms ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
              {showPrograms && (
                <View style={styles.dropdown}>
                  {PROGRAMS.map((p) => (
                    <TouchableOpacity
                      key={p}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setProgram(p)
                        setShowPrograms(false)
                      }}
                    >
                      <Text style={[styles.dropdownText, program === p && styles.dropdownTextActive]}>
                        {p}
                      </Text>
                      {program === p && (
                        <Ionicons name="checkmark" size={14} color={colors.primary} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mínimo 8 caracteres"
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

            {/* Terms */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}>
                {acceptedTerms && <Ionicons name="checkmark" size={10} color={colors.white} />}
              </View>
              <Text style={styles.termsText}>
                Acepto los{' '}
                <Text style={styles.termsLink}>Términos de Uso</Text>
                {' '}y la{' '}
                <Text style={styles.termsLink}>Política de Privacidad</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <TouchableOpacity
            style={[styles.primaryButton, (!acceptedTerms || loading) && styles.primaryButtonDisabled]}
            activeOpacity={0.85}
            disabled={!acceptedTerms || loading}
            onPress={async () => {
              if (!fullName || !email || !password || !program) {
                Alert.alert('Campos requeridos', 'Completa todos los campos.')
                return
              }
              setLoading(true)
              try {
                await register(email, password)
                await completeOnboarding({
                  name: fullName,
                  role: 'student',
                  career: program,
                  faculty: program,
                })
                // navigator.tsx redirige automáticamente al StudentStack
              } catch (err: any) {
                Alert.alert('Error al registrarse', err.message)
              } finally {
                setLoading(false)
              }
            }}
          >
            {loading
              ? <ActivityIndicator color={colors.white} />
              : <Text style={styles.primaryButtonText}>Crear cuenta</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Ya tengo una cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: { padding: spacing.md, paddingTop: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: fontSize.headingLg, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22, marginBottom: 28 },
  form: { gap: spacing.md, marginBottom: spacing.lg },
  field: { gap: spacing.xs },
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
  input: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 48,
  },
  selectText: { fontSize: fontSize.body, color: colors.textPrimary },
  selectPlaceholder: { color: colors.placeholder },
  dropdown: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  dropdownText: { fontSize: fontSize.body, color: colors.textPrimary },
  dropdownTextActive: { color: colors.primary, fontWeight: '500' },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginTop: spacing.xs },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  termsText: { flex: 1, fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
  termsLink: { color: colors.primary, fontWeight: '500' },
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
  secondaryButton: {
    borderRadius: radius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  secondaryButtonText: { color: colors.primary, fontSize: fontSize.body, fontWeight: '500' },
})
