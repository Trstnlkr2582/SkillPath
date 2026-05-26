import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'

const CRITERIA = [
  {
    id: '1',
    title: 'Completar curso: Patrones de Diseño Vue.js',
    type: 'Obligatorio • Debe estar',
    progress: 'Finalizado con más > 80/100',
    icon: 'book-outline',
    color: colors.activeBg,
  },
  {
    id: '2',
    title: 'Evaluación de Capstone Project',
    type: 'Obligatorio • Calificación > Valoración por',
    progress: 'Instructor requerida',
    icon: 'checkmark-circle-outline',
    color: colors.primaryLight,
    completed: true,
  },
  {
    id: '3',
    title: 'Examen de Certificación Final',
    type: 'Obligatorio • 50 preguntas.',
    progress: 'tiempo mínimo: 60 min',
    icon: 'document-text-outline',
    color: colors.surface,
  },
]

const AUTOMATION_RULES = [
  { label: 'Actividad Logística', sub: 'Si el usuario completa todos los módulos activa emisión', key: 'logistics', on: true },
  { label: 'Notificación de Éxito', sub: 'Permite "¡Certificación obtenida!"', key: 'notification', on: true },
  { label: 'Publicación en LinkedIn', sub: 'Comparte la credencial en el perfil del usuario', key: 'linkedin', on: false },
]

const BADGE_COLORS = ['#2A6B5A', '#C87B00', '#6B5CB8', '#1C2B2A']

export default function AdminCourseDetailScreen({ navigation }: any) {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(AUTOMATION_RULES.map((r) => [r.key, r.on]))
  )

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <TouchableOpacity style={styles.headerSearch}>
            <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AD</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Breadcrumb + title */}
        <View style={styles.titleSection}>
          <Text style={styles.breadcrumb}>MC-2022-UIFE-01</Text>
          <Text style={styles.courseTitle}>Desarrollo Avanzado con Vue.js 3</Text>
          <Text style={styles.courseSub}>
            Configuración detallada de criterios y reglas para la micro-credencial de alto nivel
          </Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.previewBtn} activeOpacity={0.7}>
              <Ionicons name="eye-outline" size={14} color={colors.primary} />
              <Text style={styles.previewBtnText}>Vista Previa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.publishBtn} activeOpacity={0.85}>
              <Ionicons name="ribbon-outline" size={14} color={colors.white} />
              <Text style={styles.publishBtnText}>Publicar Credencial</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Badge design */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Diseño de Insignia</Text>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="create-outline" size={14} color={colors.primary} />
              <Text style={styles.editBtnText}>Editar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgeContainer}>
            <View style={styles.badgePreview}>
              <View style={styles.badgeIcon}>
                <Ionicons name="chevron-up" size={20} color={colors.white} />
              </View>
              <Text style={styles.badgeName}>gUE.JS</Text>
              <Text style={styles.badgeLevel}>MASTER</Text>
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeInfoLabel}>Paleta de Color</Text>
              <View style={styles.colorPalette}>
                {BADGE_COLORS.map((c, i) => (
                  <View key={i} style={[styles.colorDot, { backgroundColor: c }]} />
                ))}
              </View>
              <Text style={styles.metaLabel}>Metadatos OpenBadges v2.1</Text>
              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaKey}>Issuer ID</Text>
                  <Text style={styles.metaValue}>Fundación...</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaKey}>Badge ID</Text>
                  <Text style={styles.metaValue}>SKP-0922</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaKey}>Revocado</Text>
                  <Text style={styles.metaValue}>No</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaKey}>Emitido</Text>
                  <Text style={styles.metaValue}>Nunca</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Criteria */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Criterios de Obtención</Text>
            <TouchableOpacity style={styles.addCriteriaBtn}>
              <Ionicons name="add" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {CRITERIA.map((c) => (
            <View key={c.id} style={[styles.criteriaItem, { backgroundColor: c.color }]}>
              <View style={styles.criteriaIcon}>
                <Ionicons name={c.icon as any} size={18} color={colors.primary} />
              </View>
              <View style={styles.criteriaInfo}>
                <Text style={styles.criteriaTitle}>{c.title}</Text>
                <Text style={styles.criteriaType}>{c.type}</Text>
                <Text style={styles.criteriaProgress}>{c.progress}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Automation rules */}
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
                value={toggles[rule.key]}
                onValueChange={() => setToggles((p) => ({ ...p, [rule.key]: !p[rule.key] }))}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.white}
                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
              />
            </View>
          ))}
        </View>

        <View style={{ height: spacing.xl }} />
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
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerBtn: { padding: spacing.xs },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerSearch: { padding: spacing.xs },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.avatarText },
  scroll: { flex: 1 },
  titleSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    gap: spacing.xs,
  },
  breadcrumb: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.4 },
  courseTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  courseSub: { fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
  actionRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  previewBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.primary },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  publishBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
  },
  editBtnText: { fontSize: fontSize.caption, fontWeight: '500', color: colors.primary },
  addCriteriaBtn: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  badgePreview: {
    width: 100,
    height: 100,
    borderRadius: radius.lg,
    backgroundColor: colors.accentViolet,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  badgeIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeName: { fontSize: fontSize.bodySm, fontWeight: '700', color: colors.white, letterSpacing: 1 },
  badgeLevel: { fontSize: fontSize.caption, fontWeight: '600', color: 'rgba(255,255,255,0.7)', letterSpacing: 2 },
  badgeInfo: { flex: 1, gap: spacing.xs },
  badgeInfoLabel: { fontSize: fontSize.label, fontWeight: '600', color: colors.textMuted },
  colorPalette: { flexDirection: 'row', gap: 6 },
  colorDot: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: colors.white },
  metaLabel: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted, marginTop: 4 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  metaItem: { width: '47%' },
  metaKey: { fontSize: 9, color: colors.textMuted, fontWeight: '500' },
  metaValue: { fontSize: fontSize.caption, color: colors.textPrimary, fontWeight: '500' },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  criteriaIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  criteriaInfo: { flex: 1 },
  criteriaTitle: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  criteriaType: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  criteriaProgress: { fontSize: fontSize.caption, color: colors.primary, marginTop: 1 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 4 },
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
})
