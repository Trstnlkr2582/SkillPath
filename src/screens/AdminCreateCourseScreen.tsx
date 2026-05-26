import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'

const CATEGORIES = ['UX/UI Design', 'Desarrollo Web', 'Data Science', 'Liderazgo', 'Negocios']
const TEACHERS = ['Dra. Helena Rivas', 'Mtrs. Jorge Linares', 'Lic. Sofía Chan', 'Dr. Andrés Mora']

const AUTOMATION_RULES = [
  { label: 'Actividad Logística', sub: 'Si el usuario completa todos...', key: 'logistics' },
  { label: 'Notificación de Éxito', sub: 'Permite "¡Certificación obtenida!"...', key: 'notification' },
  { label: 'Publicación en LinkedIn', sub: 'Comparte la credencial en el perfil del...', key: 'linkedin' },
  { label: 'Generación de PDF Título', sub: 'Genera el certificado en PDF...', key: 'pdf' },
]

export default function AdminCreateCourseScreen({ navigation }: any) {
  const [courseName, setCourseName] = useState('')
  const [teacher, setTeacher] = useState('')
  const [showTeachers, setShowTeachers] = useState(false)
  const [category, setCategory] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [fileAttached, setFileAttached] = useState(false)
  const [automationToggles, setAutomationToggles] = useState<Record<string, boolean>>({
    logistics: true,
    notification: true,
    linkedin: false,
    pdf: false,
  })

  const toggleAutomation = (key: string) => {
    setAutomationToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SkillPath</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Title */}
        <View style={styles.titleSection}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>ADMINISTRADOR</Text>
          </View>
          <Text style={styles.pageTitle}>Crear Nuevo Curso</Text>
        </View>

        {/* Configuración Inicial */}
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
            <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            <Text style={styles.infoText}>
              La configuración inicial es crucial para el posicionamiento del curso en el catálogo institucional.
            </Text>
          </View>
        </View>

        {/* Imagen de Portada */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Imagen de Portada</Text>
          <TouchableOpacity
            style={[styles.dropZone, fileAttached && styles.dropZoneAttached]}
            onPress={() => setFileAttached(!fileAttached)}
            activeOpacity={0.8}
          >
            {fileAttached ? (
              <>
                <Ionicons name="image" size={28} color={colors.primary} />
                <Text style={styles.dropZoneAttachedTitle}>portada_curso.png</Text>
                <Text style={styles.dropZoneSub}>1.8 MB · Toca para cambiar</Text>
              </>
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={28} color={colors.textMuted} />
                <Text style={styles.dropZoneTitle}>Haz clic para subir</Text>
                <Text style={styles.dropZoneSub}>PNG, JPG, máx. 5MB</Text>
                <Text style={styles.dropZoneDim}>1280×720px</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.previewLabel}>Vista previa sugerida</Text>
          <View style={styles.previewBox}>
            <View style={styles.previewPlaceholder}>
              <Ionicons name="image-outline" size={24} color={colors.border} />
            </View>
            <View style={styles.previewText}>
              <View style={styles.previewLine} />
              <View style={[styles.previewLine, { width: '60%' }]} />
            </View>
          </View>
        </View>

        {/* Reglas de Automatización */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reglas de Automatización</Text>
          {AUTOMATION_RULES.map((rule) => (
            <View key={rule.key} style={styles.ruleRow}>
              <View style={styles.ruleIcon}>
                <Ionicons name="flash-outline" size={16} color={colors.primary} />
              </View>
              <View style={styles.ruleInfo}>
                <Text style={styles.ruleLabel}>{rule.label}</Text>
                <Text style={styles.ruleSub} numberOfLines={1}>{rule.sub}</Text>
              </View>
              <Switch
                value={automationToggles[rule.key]}
                onValueChange={() => toggleAutomation(rule.key)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.white}
                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
              />
            </View>
          ))}
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Entradas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.accentAmber }]}>42</Text>
            <Text style={styles.statLabel}>En proceso</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>98%</Text>
            <Text style={styles.statLabel}>Confianza</Text>
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Bottom actions */}
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
  backBtn: { padding: spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary },
  scroll: { flex: 1 },
  titleSection: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xs, gap: spacing.xs },
  adminBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  adminBadgeText: { fontSize: fontSize.caption, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
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
    gap: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  infoText: { flex: 1, fontSize: fontSize.caption, color: colors.primaryDark, lineHeight: 18 },
  dropZone: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
  },
  dropZoneAttached: { borderColor: colors.primary, borderStyle: 'solid', backgroundColor: colors.primaryLight },
  dropZoneTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  dropZoneSub: { fontSize: fontSize.caption, color: colors.placeholder },
  dropZoneDim: { fontSize: fontSize.caption, color: colors.placeholder },
  dropZoneAttachedTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.primary },
  previewLabel: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  previewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewPlaceholder: {
    width: 56,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: { flex: 1, gap: 6 },
  previewLine: { height: 8, backgroundColor: colors.border, borderRadius: 4, width: '80%' },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  ruleIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleInfo: { flex: 1 },
  ruleLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  ruleSub: { fontSize: fontSize.caption, color: colors.textMuted },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: colors.border },
  statValue: { fontSize: fontSize.headingMd, fontWeight: '700', color: colors.textPrimary },
  statLabel: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
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
    backgroundColor: colors.primary,
  },
  nextBtnDisabled: { backgroundColor: colors.border },
  nextBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
})
