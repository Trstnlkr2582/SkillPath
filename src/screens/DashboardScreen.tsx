import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import BottomNavBar from '../components/BottomNavBar'

import { useAuth } from '../context/AuthContext'
import { coursesService } from '../services/courses.service'
import { progressService } from '../services/progress.service'
import { Course, Progress } from '../types'

const SKILLS = [
  { label: 'Uú Design', level: 'Avanzado', pct: 80, color: colors.primary },
  { label: 'React JS', level: 'Intermedio', pct: 55, color: colors.accentViolet },
  { label: 'Data Analysis', level: 'Básico', pct: 35, color: colors.accentAmber },
  { label: 'Agile Methodologies', level: 'Avanzado', pct: 78, color: colors.primary },
]

const TASKS = [
  { time: '14:00 PM', title: 'Diseño de Interfaces Complejas', sub: 'Módulo 4: Sistemas de Diseño', action: 'Ir a la clase', urgent: false },
  { time: '16:30 PM', title: 'React Avanzado: Hooks & Context', sub: 'Sesión en vivo con mentor', action: 'Unirse a un Zoom ↗', urgent: false },
]

export default function DashboardScreen({ navigation }: any) {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [progressList, setProgressList] = useState<Progress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      coursesService.getMyCourses(),
      progressService.getMyProgress(),
    ]).then(([c, p]) => {
      setCourses(c)
      setProgressList(p)
    }).finally(() => setLoading(false))
  }, [])

  const overallPct = progressList.length
    ? Math.round(progressList.reduce((s, p) => s + p.completion_percentage, 0) / progressList.length)
    : 74
  const totalHours = progressList.reduce((s, p) => s + (p.total_study_hours ?? 0), 0) || 128
  const completedCourses = progressList.filter((p) => p.completed).length || 14

  const firstName = user?.name?.split(' ')[0] ?? 'Estudiante'

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, { alignItems: 'center', justifyContent: 'center' }]} edges={['top']}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>¡Bienvenido de nuevo, {firstName}!</Text>
          <Text style={styles.greetingSub}>
            Has completado el {overallPct}% de tus objetivos semanales. ¡Sigue así!
          </Text>
        </View>

        <View style={styles.content}>
          {/* Progreso General */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.cardTitle}>Progreso General</Text>
                <Text style={styles.cardSub}>Ruta de Carrera: Product Manager</Text>
              </View>
              <View style={styles.strakBadge}>
                <Ionicons name="flame-outline" size={12} color={colors.successText} />
                <Text style={styles.streakText}>12 Días de racha</Text>
              </View>
            </View>

            <View style={styles.circleWrapper}>
              <View style={styles.circle}>
                <Text style={styles.circlePct}>{overallPct}%</Text>
                <Text style={styles.circleLabel}>Completado</Text>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{Math.round(totalHours)}</Text>
                <Text style={styles.statLabel}>HORAS DE ESTUDIO</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{completedCourses}</Text>
                <Text style={styles.statLabel}>CURSOS FINALIZADOS</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${overallPct}%` as any }]} />
            </View>
          </View>

          {/* Recommended course */}
          <View style={styles.recommendCard}>
            <View style={styles.recommendImg}>
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedBadgeText}>RECOMENDADO</Text>
              </View>
              <Ionicons name="laptop-outline" size={36} color="rgba(255,255,255,0.4)" />
            </View>
            <View style={styles.recommendBody}>
              <Text style={styles.recommendTitle}>Estrategia de Producto Digital</Text>
              <Text style={styles.recommendSub}>Basado en tu interés por Uú y Negocios Digitales.</Text>
              <TouchableOpacity
                style={styles.recommendBtn}
                onPress={() => navigation.navigate('Catalog')}
                activeOpacity={0.8}
              >
                <Text style={styles.recommendBtnText}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mapa de Competencias */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Mapa de Competencias</Text>
            {SKILLS.map((skill) => (
              <View key={skill.label} style={styles.skillRow}>
                <Text style={styles.skillLabel}>{skill.label}</Text>
                <View style={styles.skillBarWrapper}>
                  <View style={[styles.skillBarFill, { width: `${skill.pct}%` as any, backgroundColor: skill.color }]} />
                </View>
                <Text style={[styles.skillLevel, { color: skill.color }]}>{skill.level}</Text>
              </View>
            ))}
          </View>

          {/* Próximos para hoy */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Próximos para hoy</Text>
            {TASKS.map((task, i) => (
              <View key={i} style={[styles.taskRow, i > 0 && styles.taskRowBorder]}>
                <View style={styles.taskIcon}>
                  <Ionicons name="time-outline" size={16} color={colors.textMuted} />
                </View>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskSub}>{task.sub}</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Lesson')}>
                    <Text style={styles.taskLink}>{task.action}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
            ))}
          </View>

          {/* Achievement banner */}
          <View style={styles.achievementBanner}>
            <View style={styles.achievementIcon}>
              <Ionicons name="trophy-outline" size={20} color="#C8B400" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.achievementTitle}>¡Casi llegas al nivel 5!</Text>
              <Text style={styles.achievementSub}>Completa 2 tareas más para obtener tu nueva certificación.</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('Catalog')}>
        <Ionicons name="add" size={26} color={colors.white} />
      </TouchableOpacity>

      <BottomNavBar activeTab="Dashboard" navigation={navigation} />
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
    borderRadius: 17,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '600', color: colors.avatarText },
  scroll: { flex: 1 },
  greeting: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  greetingTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  greetingSub: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 20 },
  content: { padding: spacing.md, gap: spacing.sm },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  cardSub: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  strakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.activeBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  streakText: { fontSize: 11, fontWeight: '500', color: colors.successText },
  circleWrapper: { alignItems: 'center', paddingVertical: spacing.sm },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 8,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlePct: { fontSize: fontSize.headingMd, fontWeight: '700', color: colors.primary },
  circleLabel: { fontSize: 10, color: colors.textMuted },
  statRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  statDivider: { width: 1, height: 40, backgroundColor: colors.border },
  statValue: { fontSize: 32, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 10, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.5, textAlign: 'center' },
  progressTrack: { height: 6, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  recommendCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  recommendImg: {
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  recommendedBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.accentAmber,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  recommendedBadgeText: { fontSize: 9, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  recommendBody: { padding: spacing.md, gap: 6 },
  recommendTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.white },
  recommendSub: { fontSize: fontSize.bodySm, color: 'rgba(255,255,255,0.65)' },
  recommendBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
    marginTop: 4,
  },
  recommendBtnText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.white },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  skillRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  skillLabel: { fontSize: 12, color: colors.textPrimary, width: 120 },
  skillBarWrapper: { flex: 1, height: 6, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  skillBarFill: { height: '100%', borderRadius: 4 },
  skillLevel: { fontSize: 11, fontWeight: '500', width: 68, textAlign: 'right' },
  taskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8 },
  taskRowBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  taskIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 13, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  taskSub: { fontSize: 11, color: colors.textMuted },
  taskLink: { fontSize: 12, color: colors.primary, fontWeight: '500', marginTop: 4 },
  taskTime: { fontSize: 11, color: colors.textMuted, fontWeight: '500' },
  achievementBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.credentialBg,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: 'rgba(107,92,184,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementTitle: { fontSize: 13, fontWeight: '600', color: colors.accentViolet, marginBottom: 2 },
  achievementSub: { fontSize: 11, color: colors.textMuted, lineHeight: 16 },
  fab: {
    position: 'absolute',
    bottom: 92,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
})
