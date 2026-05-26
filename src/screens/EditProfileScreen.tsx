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
import { useAuth } from '../context/AuthContext'

export default function EditProfileScreen({ navigation }: any) {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [career, setCareer] = useState(user?.academic_profile?.career ?? '')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Campo requerido', 'El nombre no puede estar vacío.')
      return
    }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      Alert.alert('Perfil actualizado', 'Tus datos han sido guardados correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    }, 800)
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Editar Perfil</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Avatar section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() : 'US'}
            </Text>
          </View>
          <TouchableOpacity style={styles.changePhotoBtn} activeOpacity={0.7}>
            <Ionicons name="camera-outline" size={14} color={colors.primary} />
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={email}
              editable={false}
              placeholderTextColor={colors.placeholder}
            />
            <Text style={styles.fieldHint}>El correo no puede modificarse.</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Carrera / Especialización</Text>
            <TextInput
              style={styles.input}
              value={career}
              onChangeText={setCareer}
              placeholder="Ej. Ingeniería de Software"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Biografía</Text>
            <TextInput
              style={styles.textarea}
              value={bio}
              onChangeText={setBio}
              placeholder="Cuéntanos un poco sobre ti..."
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
            onPress={handleSave}
            activeOpacity={0.85}
            disabled={saving}
          >
            <Text style={styles.saveBtnText}>{saving ? 'Guardando...' : 'Guardar cambios'}</Text>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  avatarText: { fontSize: 26, fontWeight: '600', color: colors.avatarText },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  changePhotoText: { fontSize: fontSize.bodySm, color: colors.primary, fontWeight: '500' },
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
  inputDisabled: { backgroundColor: colors.surface, color: colors.textMuted },
  fieldHint: { fontSize: fontSize.caption, color: colors.textMuted },
  textarea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    minHeight: 100,
    lineHeight: 22,
  },
  saveBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  cancelBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: { fontSize: fontSize.body, color: colors.textMuted, fontWeight: '500' },
})
