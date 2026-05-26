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
    : 0

  const totalHours = progressList.reduce((s, p) => s + (p.total_study_hours ?? 0), 0)
  const completedCourses = progressList.filter((p) => p.completed).length

  const lastCourse = courses.find((c) =>
    progressList.find((p) => p.course_id === c.id && !p.completed)
  )
  const lastProgress = lastCourse
    ? progressList.find((p) => p.course_id === lastCourse.id)
    : null

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

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.brand}>SkillPath</Text>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>¡Bienvenido de nuevo, {firstName}!</Text>
          <Text style={styles.greetingSub}>
            {overallPct > 0
              ? `Has completado el ${overallPct}% de tus cursos. ¡Sigue así!`
              : 'Explora el catálogo y comienza tu primer curso.'}
          </Text>
        </View>

        {/* Bento Grid */}
        <View style={styles.bentoGrid}>

          {/* Progreso General */}
          <View style={styles.cardWide}>
            <Text style={styles.cardLabel}>Progreso General</Text>
            <Text style={styles.cardSublabel}>{courses.length} curso{courses.length !== 1 ? 's' : ''} inscrito{courses.length !== 1 ? 's' : ''}</Text>
            <View style={styles.progressRow}>
              <View style={styles.progressCircleWrapper}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressCircleValue}>{overallPct}%</Text>
                  <Text style={styles.progressCircleCaption}>completado</Text>
                </View>
              </View>
              <View style={styles.statsColumn}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{Math.round(totalHours)}</Text>
                  <Text style={styles.statLabel}>HORAS DE ESTUDIO</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{completedCourses}</Text>
                  <Text style={styles.statLabel}>CURSOS FINALIZADOS</Text>
                </View>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${overallPct}%` as any }]} />
            </View>
          </View>

          {/* Continuar curso */}
          {lastCourse ? (
            <View style={styles.cardRecommend}>
              <Text style={styles.recommendLabel}>Continúa donde lo dejaste</Text>
              <View style={styles.recommendCover}>
                <Ionicons name="play-circle-outline" size={32} color={colors.white} />
              </View>
              <Text style={styles.recommendTitle} numberOfLines={2}>{lastCourse.title}</Text>
              <View style={styles.recommendBadge}>
                <Text style={styles.recommendBadgeText}>{lastProgress?.completion_percentage ?? 0}% completado</Text>
              </View>
              <TouchableOpacity
                style={styles.recommendBtn}
                onPress={() => navigation.navigate('CourseDetail', { courseId: lastCourse.id })}
                activeOpacity={0.8}
              >
                <Text style={styles.recommendBtnText}>Continuar</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cardRecommend}>
              <Text style={styles.recommendLabel}>Explora cursos</Text>
              <View style={styles.recommendCover}>
                <Ionicons name="book-outline" size={32} color={colors.white} />
              </View>
              <Text style={styles.recommendTitle}>Encuentra tu próximo curso</Text>
              <TouchableOpacity
                style={styles.recommendBtn}
                onPress={() => navigation.navigate('Catalog')}
                activeOpacity={0.8}
              >
                <Text style={styles.recommendBtnText}>Ver catálogo</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}

          {/* Quick Access */}
          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickCard}
              onPress={() => navigation.navigate('Catalog')}
              activeOpacity={0.8}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="search-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.quickText}>Explorar cursos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickCard}
              onPress={() => navigation.navigate('Credentials')}
              activeOpacity={0.8}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.credentialBg }]}>
                <Ionicons name="ribbon-outline" size={20} color={colors.accentViolet} />
              </View>
              <Text style={styles.quickText}>Mis logros</Text>
            </TouchableOpacity>
          </View>

          {/* Weekly streak */}
          <View style={styles.streakCard}>
            <View style={styles.streakLeft}>
              <Text style={styles.streakLabel}>Racha semanal</Text>
              <Text style={styles.streakDays}>14 días seguidos</Text>
            </View>
            <View style={[styles.streakIcon, { backgroundColor: colors.credentialBg }]}>
              <Ionicons name="flame-outline" size={24} color={colors.accentViolet} />
            </View>
          </View>

        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <BottomNavBar activeTab="Dashboard" navigation={navigation} />
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
  brand: { fontSize: 20, fontWeight: '700', color: colors.primary },
  notifBtn: { padding: spacing.xs, position: 'relative' },
  notifDot: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accentAmber,
  },
  scroll: { flex: 1 },
  greetingSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: { fontSize: fontSize.headingLg, fontWeight: '600', color: colors.textPrimary, marginBottom: 6 },
  greetingSub: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22 },
  bentoGrid: { paddingHorizontal: spacing.md, gap: spacing.sm },
  cardWide: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  cardLabel: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  cardSublabel: { fontSize: fontSize.bodySm, color: colors.textMuted, marginBottom: spacing.md },
  progressRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  progressCircleWrapper: { alignItems: 'center', justifyContent: 'center' },
  progressCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 8,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleValue: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.primary },
  progressCircleCaption: { fontSize: 9, color: colors.textMuted, textAlign: 'center' },
  statsColumn: { flex: 1, gap: spacing.sm },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  statValue: { fontSize: fontSize.headingMd, fontWeight: '500', color: colors.primary },
  statLabel: { fontSize: 10, color: colors.textMuted, fontWeight: '500', marginTop: 2 },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  cardRecommend: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  recommendLabel: { fontSize: fontSize.caption, fontWeight: '500', color: 'rgba(255,255,255,0.6)', marginBottom: spacing.sm },
  recommendCover: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  recommendTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.white, marginBottom: spacing.sm },
  recommendBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.progressBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: spacing.sm,
  },
  recommendBadgeText: { fontSize: fontSize.caption, fontWeight: '500', color: colors.progressText },
  recommendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  recommendBtnText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.white },
  quickRow: { flexDirection: 'row', gap: spacing.sm },
  quickCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary, textAlign: 'center' },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  streakLeft: { gap: 4 },
  streakLabel: { fontSize: fontSize.bodySm, color: colors.textMuted },
  streakDays: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.accentViolet },
  streakIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
