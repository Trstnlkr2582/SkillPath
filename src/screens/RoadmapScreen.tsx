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

const MODULES = [
  {
    id: 1,
    title: 'Fundamentos de Diseño Visual',
    lessons: 5,
    duration: '4h 30m',
    status: 'completed' as const,
    progress: 100,
  },
  {
    id: 2,
    title: 'Sistemas de Diseño y Componentes',
    lessons: 7,
    duration: '6h',
    status: 'active' as const,
    progress: 60,
  },
  {
    id: 3,
    title: 'Prototipado e Interacción Avanzada',
    lessons: 6,
    duration: '5h 15m',
    status: 'locked' as const,
    progress: 0,
  },
  {
    id: 4,
    title: 'Evaluación de Usabilidad',
    lessons: 4,
    duration: '3h 30m',
    status: 'locked' as const,
    progress: 0,
  },
]

const statusConfig = {
  completed: {
    dot: colors.primary,
    badge: { bg: colors.activeBg, text: colors.activeText, label: 'Completado' },
    icon: 'checkmark-circle' as const,
    iconColor: colors.successText,
  },
  active: {
    dot: colors.accentAmber,
    badge: { bg: colors.progressBg, text: colors.progressText, label: 'En progreso' },
    icon: 'play-circle-outline' as const,
    iconColor: colors.accentAmber,
  },
  locked: {
    dot: colors.border,
    badge: { bg: colors.lockedBg, text: colors.lockedText, label: 'Bloqueado' },
    icon: 'lock-closed-outline' as const,
    iconColor: colors.textMuted,
  },
}

export default function RoadmapScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Course Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerNav}>
          <TouchableOpacity style={styles.navChip}>
            <Text style={styles.navChipText}>Contenido</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navChip, styles.navChipActive]}>
            <Text style={[styles.navChipText, styles.navChipActiveText]}>Hoja de ruta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>Diseño de Interfaces Avanzado</Text>
        <Text style={styles.courseDesc}>
          Domina los principios avanzados de interacción y diseño de sistemas complejos para productos
          digitales de alto impacto.
        </Text>
        {/* Overall progress */}
        <View style={styles.overallProgress}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Progreso del curso</Text>
            <Text style={styles.progressValue}>25%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '25%' }]} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.timeline}>
          {MODULES.map((module, idx) => {
            const config = statusConfig[module.status]
            const isLast = idx === MODULES.length - 1
            return (
              <View key={module.id} style={styles.timelineItem}>
                {/* Dot + line */}
                <View style={styles.timelineSide}>
                  <View style={[styles.dot, { backgroundColor: config.dot }]} />
                  {!isLast && (
                    <View style={[styles.line, module.status === 'completed' && styles.lineCompleted]} />
                  )}
                </View>

                {/* Card */}
                <TouchableOpacity
                  style={[
                    styles.moduleCard,
                    module.status === 'active' && styles.moduleCardActive,
                    module.status === 'locked' && styles.moduleCardLocked,
                  ]}
                  activeOpacity={module.status === 'locked' ? 1 : 0.8}
                  onPress={() => module.status !== 'locked' && navigation.navigate('Lesson')}
                >
                  <View style={styles.moduleTop}>
                    <View style={styles.moduleTitleRow}>
                      <Ionicons name={config.icon} size={18} color={config.iconColor} />
                      <Text style={[styles.moduleTitle, module.status === 'locked' && styles.moduleTitleLocked]}>
                        {module.title}
                      </Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: config.badge.bg }]}>
                      <Text style={[styles.badgeText, { color: config.badge.text }]}>
                        {config.badge.label}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.moduleMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="layers-outline" size={12} color={colors.textMuted} />
                      <Text style={styles.metaText}>{module.lessons} lecciones</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                      <Text style={styles.metaText}>{module.duration}</Text>
                    </View>
                  </View>

                  {module.status === 'active' && (
                    <View style={styles.moduleProgress}>
                      <View style={styles.progressTrackSm}>
                        <View style={[styles.progressFillAmber, { width: `${module.progress}%` }]} />
                      </View>
                      <Text style={styles.progressPct}>{module.progress}%</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )
          })}

          {/* Final goal */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineSide}>
              <View style={[styles.dot, styles.dotGoal]} />
            </View>
            <View style={styles.goalCard}>
              <Ionicons name="ribbon-outline" size={24} color={colors.accentViolet} />
              <View>
                <Text style={styles.goalTitle}>Certificación Final</Text>
                <Text style={styles.goalSub}>Completa todos los módulos para obtener tu microcredencial</Text>
              </View>
            </View>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryDark,
    gap: spacing.sm,
  },
  backBtn: { padding: spacing.xs },
  headerNav: { flexDirection: 'row', gap: spacing.sm },
  navChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
  navChipActive: { backgroundColor: colors.primary },
  navChipText: { fontSize: fontSize.bodySm, color: 'rgba(255,255,255,0.7)', fontWeight: '400' },
  navChipActiveText: { color: colors.white, fontWeight: '500' },
  courseInfo: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    gap: 10,
  },
  courseName: { fontSize: fontSize.headingLg, fontWeight: '600', color: colors.white },
  courseDesc: { fontSize: fontSize.body, color: 'rgba(255,255,255,0.65)', lineHeight: 22 },
  overallProgress: { gap: spacing.xs },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: fontSize.bodySm, color: 'rgba(255,255,255,0.6)' },
  progressValue: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.white },
  progressTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  scroll: { flex: 1 },
  timeline: { paddingHorizontal: spacing.md, paddingTop: spacing.lg },
  timelineItem: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  timelineSide: { alignItems: 'center', width: 16 },
  dot: { width: 12, height: 12, borderRadius: 6, marginTop: 4 },
  dotGoal: { backgroundColor: colors.accentViolet, width: 14, height: 14, borderRadius: 7 },
  line: { width: 2, flex: 1, backgroundColor: colors.border, marginTop: spacing.xs },
  lineCompleted: { backgroundColor: colors.primary },
  moduleCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  moduleCardActive: { borderColor: colors.accentAmber, borderWidth: 1.5 },
  moduleCardLocked: { opacity: 0.6 },
  moduleTop: { gap: spacing.sm },
  moduleTitleRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  moduleTitle: { flex: 1, fontSize: fontSize.headingSm, fontWeight: '500', color: colors.textPrimary },
  moduleTitleLocked: { color: colors.textMuted },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: fontSize.caption, fontWeight: '500' },
  moduleMeta: { flexDirection: 'row', gap: spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  metaText: { fontSize: fontSize.caption, color: colors.textMuted },
  moduleProgress: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  progressTrackSm: { flex: 1, height: 4, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFillAmber: { height: '100%', backgroundColor: colors.accentAmber, borderRadius: 4 },
  progressPct: { fontSize: fontSize.caption, fontWeight: '500', color: colors.accentAmber, width: 28 },
  goalCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.credentialBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentViolet + '40',
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  goalTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.credentialText },
  goalSub: { fontSize: fontSize.bodySm, color: colors.textMuted, marginTop: 4 },
})
