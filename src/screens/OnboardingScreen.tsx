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

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth()
  const [role, setRole] = useState<'student' | 'professor'>('student')
  const [fullName, setFullName] = useState('')
  const [program, setProgram] = useState('')
  const [showPrograms, setShowPrograms] = useState(false)
  const [department, setDepartment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      Alert.alert('Campo requerido', 'Ingresa tu nombre completo.')
      return
    }
    if (role === 'student' && !program) {
      Alert.alert('Campo requerido', 'Selecciona tu programa académico.')
      return
    }
    if (role === 'professor' && !department.trim()) {
      Alert.alert('Campo requerido', 'Ingresa tu departamento.')
      return
    }

    setLoading(true)
    try {
      await completeOnboarding(
        role === 'student'
          ? { name: fullName, role: 'student', career: program, faculty: program }
          : { name: fullName, role: 'professor', department }
      )
      // RootStack redirige automáticamente al stack correcto
    } catch (err: any) {
      Alert.alert('Error', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>SkillPath</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Completa tu perfil</Text>
          <Text style={styles.subtitle}>Solo necesitamos unos datos para configurar tu cuenta.</Text>

          <View style={styles.form}>
            {/* Nombre */}
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

            {/* Rol */}
            <View style={styles.field}>
              <Text style={styles.label}>Soy</Text>
              <View style={styles.roleRow}>
                {(['student', 'professor'] as const).map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.roleOption, role === r && styles.roleOptionActive]}
                    onPress={() => setRole(r)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={r === 'student' ? 'school-outline' : 'person-outline'}
                      size={18}
                      color={role === r ? colors.white : colors.textMuted}
                    />
                    <Text style={[styles.roleText, role === r && styles.roleTextActive]}>
                      {r === 'student' ? 'Estudiante' : 'Profesor'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Campo según rol */}
            {role === 'student' ? (
              <View style={styles.field}>
                <Text style={styles.label}>Programa Académico</Text>
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
                        onPress={() => { setProgram(p); setShowPrograms(false) }}
                      >
                        <Text style={[styles.dropdownText, program === p && styles.dropdownTextActive]}>
                          {p}
                        </Text>
                        {program === p && <Ionicons name="checkmark" size={14} color={colors.primary} />}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.field}>
                <Text style={styles.label}>Departamento</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={department}
                    onChangeText={setDepartment}
                    placeholder="Ej. Ingeniería de Software"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            activeOpacity={0.85}
            disabled={loading}
            onPress={handleSubmit}
          >
            {loading
              ? <ActivityIndicator color={colors.white} />
              : <Text style={styles.primaryButtonText}>Continuar</Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
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
  roleRow: { flexDirection: 'row', gap: spacing.sm },
  roleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  roleOptionActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  roleText: { fontSize: fontSize.body, color: colors.textMuted, fontWeight: '500' },
  roleTextActive: { color: colors.white },
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
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { color: colors.white, fontSize: fontSize.body, fontWeight: '600' },
})
