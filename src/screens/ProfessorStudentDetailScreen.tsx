import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import ProfessorBottomNavBar from '../components/ProfessorBottomNavBar'

const COMPETENCIES = [
  { label: 'Lógica', pct: 88 },
  { label: 'Análisis', pct: 75 },
  { label: 'Diseño', pct: 62 },
  { label: 'Testing', pct: 50 },
  { label: 'Deploy', pct: 40 },
]

const GRADE_HISTORY = [
  { course: 'Arquitectura de Software', grade: 9.4, icon: 'server-outline', color: colors.primary },
  { course: 'Sistemas Operativos II', grade: 8.5, icon: 'desktop-outline', color: colors.accentViolet },
  { course: 'Bases de Datos Avanzadas', grade: 7.2, icon: 'grid-outline', color: colors.accentAmber },
]

const FEEDBACK_PREV = [
  {
    tag: 'Diseño de Patrones',
    text: 'Demuestra una comprensión avanzada del patrón de diseño y sabe aplicarlo ante el escenario dado.',
    time: 'Hace 3 días',
  },
  {
    tag: 'Base de Negocio',
    text: 'Razonamiento estructurado en la toma de decisiones de diseño del proyecto de base de datos.',
    time: 'Hace 1 semana',
  },
]

export default function ProfessorStudentDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="notifications-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DR</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Student hero */}
        <View style={styles.heroSection}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentAvatarText}>JD</Text>
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.studentName}>Javier Dominguez</Text>
            <Text style={styles.studentRole}>Ingeniero de Software</Text>
            <Text style={styles.studentMeta}>CS-18-2022-3041 • Ingeniería de Software IQ</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.contactBtn} activeOpacity={0.7}>
            <Text style={styles.contactBtnText}>Contactar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportBtn} activeOpacity={0.7}>
            <Text style={styles.reportBtnText}>Reporte</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>9.4/10</Text>
            <Text style={styles.statLabel}>PROMEDIO</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>82%</Text>
            <Text style={styles.statLabel}>PROGRESO</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.accentAmber }]}>#4/45</Text>
            <Text style={styles.statLabel}>POSICIÓN</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.accentViolet }]}>98%</Text>
            <Text style={styles.statLabel}>ASISTENCIA</Text>
          </View>
        </View>

        {/* Competency growth */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Crecimiento de Competencias</Text>
            <TouchableOpacity style={styles.periodChip}>
              <Text style={styles.periodChipText}>Semana 1 – S04</Text>
              <Ionicons name="chevron-down" size={12} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          <View style={styles.competencyChart}>
            {COMPETENCIES.map((c, i) => (
              <View key={i} style={styles.competencyItem}>
                <Text style={styles.competencyLabel}>{c.label}</Text>
                <View style={styles.competencyTrack}>
                  <View style={[styles.competencyFill, { width: `${c.pct}%` as any }]} />
                </View>
                <Text style={styles.competencyPct}>{c.pct}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Previous feedback */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Feedback Previo</Text>
            <TouchableOpacity style={styles.filterIconBtn}>
              <Ionicons name="filter-outline" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          {FEEDBACK_PREV.map((fb, i) => (
            <View key={i} style={styles.feedbackItem}>
              <View style={styles.feedbackTag}>
                <Text style={styles.feedbackTagText}>{fb.tag}</Text>
              </View>
              <Text style={styles.feedbackText}>{fb.text}</Text>
              <Text style={styles.feedbackTime}>{fb.time}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.seeAllFeedback}>
            <Text style={styles.seeAllText}>Ver todo el historial →</Text>
          </TouchableOpacity>
        </View>

        {/* Grade history */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historial de Calificaciones</Text>
          {GRADE_HISTORY.map((item, i) => (
            <View key={i} style={styles.gradeItem}>
              <View style={[styles.gradeIcon, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name={item.icon as any} size={16} color={item.color} />
              </View>
              <Text style={styles.gradeTitle} numberOfLines={1}>{item.course}</Text>
              <View style={styles.gradeBadge}>
                <Text style={[styles.gradeValue, { color: item.color }]}>{item.grade}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="eye-outline" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <ProfessorBottomNavBar activeTab="ProfessorStudentsList" navigation={navigation} />
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerIconBtn: { padding: spacing.xs },
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
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  studentAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#B8CCE4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  studentAvatarText: { fontSize: 20, fontWeight: '600', color: '#2A4A6B' },
  heroInfo: { flex: 1, gap: 2 },
  studentName: { fontSize: fontSize.headingSm, fontWeight: '700', color: colors.textPrimary },
  studentRole: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.primary },
  studentMeta: { fontSize: fontSize.caption, color: colors.textMuted },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactBtn: {
    flex: 1,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
  reportBtn: {
    flex: 1,
    height: 38,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.textMuted },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statDivider: { width: 1, backgroundColor: colors.border },
  statValue: { fontSize: fontSize.bodySm, fontWeight: '700', color: colors.textPrimary },
  statLabel: { fontSize: 9, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.3 },
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
  periodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodChipText: { fontSize: fontSize.caption, color: colors.textMuted },
  filterIconBtn: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  competencyChart: { gap: spacing.xs },
  competencyItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  competencyLabel: { width: 60, fontSize: fontSize.caption, color: colors.textMuted },
  competencyTrack: { flex: 1, height: 6, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  competencyFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  competencyPct: { width: 32, fontSize: fontSize.caption, color: colors.textMuted, textAlign: 'right' },
  feedbackItem: {
    gap: 4,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  feedbackTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  feedbackTagText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.primary },
  feedbackText: { fontSize: fontSize.bodySm, color: colors.textPrimary, lineHeight: 20 },
  feedbackTime: { fontSize: fontSize.caption, color: colors.textMuted },
  seeAllFeedback: { alignSelf: 'flex-start' },
  seeAllText: { fontSize: fontSize.bodySm, color: colors.primary, fontWeight: '500' },
  gradeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  gradeIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeTitle: { flex: 1, fontSize: fontSize.bodySm, color: colors.textPrimary },
  gradeBadge: {},
  gradeValue: { fontSize: fontSize.bodySm, fontWeight: '700' },
})
