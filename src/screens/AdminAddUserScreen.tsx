import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'

type RoleType = 'student' | 'professor' | 'admin'

const ROLES: { key: RoleType; label: string; desc: string }[] = [
  { key: 'student', label: 'Estudiante', desc: 'Acceso al catálogo, cursos y entregas' },
  { key: 'professor', label: 'Profesor', desc: 'Gestión de estudiantes y calificaciones' },
  { key: 'admin', label: 'Administrador', desc: 'Acceso completo a la plataforma' },
]

export default function AdminAddUserScreen({ navigation }: any) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<RoleType>('student')
  const [career, setCareer] = useState('')
  const [saving, setSaving] = useState(false)

  const handleCreate = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Campos requeridos', 'El nombre y el correo son obligatorios.')
      return
    }
    if (!email.includes('@')) {
      Alert.alert('Correo inválido', 'Ingresa un correo electrónico válido.')
      return
    }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      Alert.alert(
        'Usuario creado',
        `Se ha enviado una invitación a ${email} con las credenciales de acceso.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      )
    }, 900)
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Añadir Usuario</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre del usuario"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="correo@institucion.edu"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Rol</Text>
            {ROLES.map((r) => (
              <TouchableOpacity
                key={r.key}
                style={[styles.roleOption, role === r.key && styles.roleOptionActive]}
                onPress={() => setRole(r.key)}
                activeOpacity={0.7}
              >
                <View style={[styles.roleRadio, role === r.key && styles.roleRadioActive]}>
                  {role === r.key && <View style={styles.roleRadioDot} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.roleLabel, role === r.key && styles.roleLabelActive]}>{r.label}</Text>
                  <Text style={styles.roleDesc}>{r.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {role === 'student' && (
            <View style={styles.field}>
              <Text style={styles.label}>Carrera</Text>
              <TextInput
                style={styles.input}
                value={career}
                onChangeText={setCareer}
                placeholder="Ej. Ingeniería de Sistemas"
                placeholderTextColor={colors.placeholder}
              />
            </View>
          )}

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            <Text style={styles.infoText}>
              Se enviará un correo de invitación con las instrucciones para establecer la contraseña.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.createBtn, saving && styles.createBtnDisabled]}
            onPress={handleCreate}
            activeOpacity={0.85}
            disabled={saving}
          >
            <Text style={styles.createBtnText}>{saving ? 'Creando...' : 'Crear usuario'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 56,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  topBarTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  scroll: { flex: 1 },
  form: { padding: spacing.md, gap: spacing.md },
  field: { gap: spacing.xs },
  label: { fontSize: fontSize.label, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 48,
    fontSize: fontSize.body,
    color: colors.textPrimary,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    marginTop: 6,
  },
  roleOptionActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  roleRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleRadioActive: { borderColor: colors.primary },
  roleRadioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  roleLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  roleLabelActive: { color: colors.primaryDark, fontWeight: '600' },
  roleDesc: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 1 },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  infoText: { flex: 1, fontSize: fontSize.bodySm, color: colors.primaryDark, lineHeight: 18 },
  createBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  createBtnDisabled: { opacity: 0.6 },
  createBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  cancelBtn: { height: 44, alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { fontSize: fontSize.body, color: colors.textMuted, fontWeight: '500' },
})
