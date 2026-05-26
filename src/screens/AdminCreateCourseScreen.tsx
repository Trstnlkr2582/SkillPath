import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
const CATEGORIES = ['UX/UI Design', 'Desarrollo Web', 'Data Science', 'Liderazgo', 'Negocios']
const TEACHERS = ['Dra. Helena Rivas', 'Mtro. Jorge Linares', 'Lic. Sofía Chan', 'Dr. Andrés Mora']

export default function AdminCreateCourseScreen({ navigation }: any) {
  const [courseName, setCourseName] = useState('')
  const [teacher, setTeacher] = useState('')
  const [showTeachers, setShowTeachers] = useState(false)
  const [category, setCategory] = useState('')
  const [showCategories, setShowCategories] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.brand}>Crear Curso</Text>
        <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.avatarText}>AD</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.titleSection}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>ADMINISTRADOR</Text>
          </View>
          <Text style={styles.pageTitle}>Crear Nuevo Curso</Text>
          <View style={styles.titleAccent} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Configuración Inicial</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre del Curso</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={courseName}
                onChangeText={setCourseName}
                placeholder="Ej. Arquitectura de Sistemas Modernos"
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Docente</Text>
            <TouchableOpacity
              style={styles.selectWrapper}
              onPress={() => { setShowTeachers(!showTeachers); setShowCategories(false) }}
              activeOpacity={0.7}
            >
              <Text style={[styles.selectText, !teacher && styles.selectPlaceholder]}>
                {teacher || 'Seleccionar docente'}
              </Text>
              <Ionicons name={showTeachers ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
            </TouchableOpacity>
            {showTeachers && (
              <View style={styles.dropdown}>
                {TEACHERS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={styles.dropdownItem}
                    onPress={() => { setTeacher(t); setShowTeachers(false) }}
                  >
                    <Text style={[styles.dropdownText, teacher === t && styles.dropdownTextActive]}>{t}</Text>
                    {teacher === t && <Ionicons name="checkmark" size={14} color={colors.primary} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Categoría</Text>
            <TouchableOpacity
              style={styles.selectWrapper}
              onPress={() => { setShowCategories(!showCategories); setShowTeachers(false) }}
              activeOpacity={0.7}
            >
              <Text style={[styles.selectText, !category && styles.selectPlaceholder]}>
                {category || 'Seleccionar categoría'}
              </Text>
              <Ionicons name={showCategories ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
            </TouchableOpacity>
            {showCategories && (
              <View style={styles.dropdown}>
                {CATEGORIES.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={styles.dropdownItem}
                    onPress={() => { setCategory(c); setShowCategories(false) }}
                  >
                    <Text style={[styles.dropdownText, category === c && styles.dropdownTextActive]}>{c}</Text>
                    {category === c && <Ionicons name="checkmark" size={14} color={colors.primary} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={16} color={colors.accentAmber} style={{ marginTop: 1 }} />
            <Text style={styles.infoText}>
              La configuración inicial es crucial para el posicionamiento del curso en el catálogo institucional.
            </Text>
          </View>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.imageSectionTitle}>Imagen de Portada</Text>
          <TouchableOpacity style={styles.dropZone} activeOpacity={0.8}>
            <Ionicons name="document-outline" size={28} color={colors.textMuted} />
            <Text style={styles.dropZoneTitle}>Haz clic para subir</Text>
            <Text style={styles.dropZoneSub}>PNG, JPG o WEBP (Recomendado: 300x200px)</Text>
          </TouchableOpacity>

          <Text style={styles.previewLabel}>Vista previa sugerida</Text>
          <View style={styles.previewRow}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={styles.previewBox} />
            ))}
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={16} color={colors.textMuted} />
          <Text style={styles.cancelBtnText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextBtn, !courseName && styles.nextBtnDisabled]}
          disabled={!courseName}
          onPress={() => navigation.navigate('AdminCourseDetail')}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>Siguiente paso</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        </TouchableOpacity>
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
  menuBtn: { padding: spacing.xs, gap: 4 },
  menuLine: { width: 20, height: 2, borderRadius: 1, backgroundColor: colors.textPrimary },
  brand: { fontSize: 18, fontWeight: '700', color: colors.primary },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '700', color: colors.successText },
  scroll: { flex: 1 },
  titleSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  adminBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  adminBadgeText: { fontSize: fontSize.caption, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  titleAccent: { width: 32, height: 3, backgroundColor: colors.primary, borderRadius: 2 },
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xs,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  field: { gap: spacing.xs },
  label: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 48,
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  input: { fontSize: fontSize.body, color: colors.textPrimary },
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.progressBg,
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  infoText: { flex: 1, fontSize: fontSize.caption, color: colors.progressText, lineHeight: 18 },
  imageSection: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  imageSectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  dropZone: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
  },
  dropZoneTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  dropZoneSub: { fontSize: fontSize.caption, color: colors.placeholder, textAlign: 'center' },
  previewLabel: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  previewRow: { flexDirection: 'row', gap: spacing.sm },
  previewBox: {
    flex: 1,
    height: 48,
    backgroundColor: colors.border,
    borderRadius: radius.md,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  cancelBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  nextBtn: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primaryDark,
  },
  nextBtnDisabled: { backgroundColor: colors.border },
  nextBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
})
