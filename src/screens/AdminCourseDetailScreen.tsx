import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'

const CRITERIA = [
  {
    id: '1',
    title: 'Completar curso: Patrones de Diseño Vue.js',
    sub: 'Obligatorio · Debe estar finalizado con nota > 80/100',
    icon: 'book-outline',
    color: colors.activeBg,
  },
  {
    id: '2',
    title: 'Evaluación de Capstone Project',
    sub: 'Obligatorio · Calificación en por mentor aprobado',
    icon: 'checkmark-circle-outline',
    color: colors.primaryLight,
    completed: true,
  },
  {
    id: '3',
    title: 'Examen de Certificación Final',
    sub: 'Obligatorio · 50 preguntas, tiempo límite: 90 min',
    icon: 'document-text-outline',
    color: colors.surface,
  },
]

const AUTOMATION_RULES = [
  { label: 'Activador Logístico', sub: 'Si el usuario completa todos los módulos activa emisión', key: 'logistics', on: true, icon: 'flash-outline' },
  { label: 'Notificación de Éxito', sub: 'Plantilla: "Certificación_V1.SSP"', key: 'notification', on: true, icon: 'mail-outline' },
  { label: 'Publicación en LinkedIn', sub: 'Habilitar botón "Add to Profile"', key: 'linkedin', on: false, icon: 'share-social-outline' },
  { label: 'Generación de PDF Físico', sub: 'Proceso por Proveedor Institucional', key: 'pdf', on: false, icon: 'print-outline' },
]

const BADGE_COLORS = ['#2A6B5A', '#1C2B2A', '#C87B00', '#6B5CB8']

export default function AdminCourseDetailScreen({ navigation }: any) {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(AUTOMATION_RULES.map((r) => [r.key, r.on]))
  )

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.brand}>SkillPath</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => Alert.alert('Buscar', 'Busca en los contenidos de este curso.')}>
            <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => Alert.alert('Notificaciones', 'No tienes notificaciones pendientes.')}>
            <Ionicons name="notifications-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.avatarText}>AD</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <View style={styles.titleTopRow}>
            <View style={styles.draftBadge}>
              <Text style={styles.draftBadgeText}>EN BORRADOR</Text>
            </View>
            <Text style={styles.courseId}>ID: MC-2025-VUE-01</Text>
          </View>
          <Text style={styles.courseTitle}>Desarrollo Avanzado con Vue.js 3</Text>
          <Text style={styles.courseSub}>
            Configuración detallada de criterios y reglas para la micro-credencial académica.
          </Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.previewBtn} activeOpacity={0.7} onPress={() => Alert.alert('Vista Previa', 'Abriendo previsualización del curso...')}>
              <Ionicons name="eye-outline" size={14} color={colors.primary} />
              <Text style={styles.previewBtnText}>Vista Previa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.publishBtn} activeOpacity={0.85} onPress={() => navigation.navigate('AdminConfirmAction')}>
              <Ionicons name="share-outline" size={14} color={colors.white} />
              <Text style={styles.publishBtnText}>Publicar Credencial</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Diseño de Insignia</Text>
            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('AdminCreateCourse')}>
              <Ionicons name="create-outline" size={14} color={colors.primary} />
              <Text style={styles.editBtnText}>Editor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgeContainer}>
            <View style={styles.badgePreview}>
              <Ionicons name="triangle-outline" size={24} color="rgba(255,255,255,0.9)" />
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
              <View style={styles.metaList}>
                <View style={styles.metaRow}>
                  <Text style={styles.metaKey}>Issuer ID</Text>
                  <Text style={styles.metaValue}>SKP-0922</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaKey}>Revalidable:</Text>
                  <Text style={styles.metaValue}>Sí</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaKey}>Expira:</Text>
                  <Text style={styles.metaValue}>Nunca</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Criterios de Obtención</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => Alert.alert('Nuevo Criterio', 'Agrega un criterio de obtención.')}>
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
                <Text style={styles.criteriaSub}>{c.sub}</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert(c.title, 'Editar o eliminar este criterio.')}>
                <Ionicons name="ellipsis-vertical" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reglas de Automatización</Text>
          {AUTOMATION_RULES.map((rule) => (
            <View key={rule.key} style={styles.ruleRow}>
              <View style={styles.ruleIcon}>
                <Ionicons name={rule.icon as any} size={16} color={colors.primary} />
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

        <View style={styles.statsBar}>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>0</Text>
            <Text style={styles.statsLabel}>Emitido</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsItem}>
            <Text style={[styles.statsValue, { color: colors.accentAmber }]}>42</Text>
            <Text style={styles.statsLabel}>En proceso</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsItem}>
            <Text style={[styles.statsValue, { color: colors.primary }]}>98%</Text>
            <Text style={styles.statsLabel}>Confianza Regla</Text>
          </View>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuBtn: { padding: spacing.xs, gap: 4 },
  menuLine: { width: 20, height: 2, borderRadius: 1, backgroundColor: colors.textPrimary },
  brand: { fontSize: 18, fontWeight: '700', color: colors.primary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  iconBtn: { padding: spacing.xs },
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
  titleTopRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  draftBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  draftBadgeText: { fontSize: fontSize.caption, fontWeight: '700', color: colors.primary, letterSpacing: 0.4 },
  courseId: { fontSize: fontSize.caption, color: colors.textMuted },
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
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  badgePreview: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    backgroundColor: colors.accentViolet,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    flexShrink: 0,
  },
  badgeName: { fontSize: 11, fontWeight: '700', color: colors.white, letterSpacing: 1 },
  badgeLevel: { fontSize: 9, fontWeight: '600', color: 'rgba(255,255,255,0.7)', letterSpacing: 2 },
  badgeInfo: { flex: 1, gap: spacing.xs },
  badgeInfoLabel: { fontSize: fontSize.label, fontWeight: '600', color: colors.textMuted },
  colorPalette: { flexDirection: 'row', gap: 6 },
  colorDot: { width: 18, height: 18, borderRadius: 9 },
  metaLabel: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted, marginTop: 2 },
  metaList: { gap: 3 },
  metaRow: { flexDirection: 'row', gap: spacing.sm },
  metaKey: { fontSize: fontSize.caption, color: colors.textMuted, width: 70 },
  metaValue: { fontSize: fontSize.caption, fontWeight: '500', color: colors.textPrimary },
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
    flexShrink: 0,
  },
  criteriaInfo: { flex: 1 },
  criteriaTitle: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  criteriaSub: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2, lineHeight: 16 },
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
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
  },
  statsItem: { flex: 1, alignItems: 'center', gap: 2 },
  statsDivider: { width: 1, backgroundColor: colors.border },
  statsValue: { fontSize: fontSize.headingSm, fontWeight: '700', color: colors.textPrimary },
  statsLabel: { fontSize: fontSize.caption, color: colors.textMuted },
})
