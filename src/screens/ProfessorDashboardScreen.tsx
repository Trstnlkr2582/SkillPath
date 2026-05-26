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

const COURSES = [
  { id: '1', title: 'Desarrollo Web Avanzado ICS-2024', subtitle: 'Sección B • 42 estudiantes', progress: 80 },
  { id: '2', title: 'Inteligencia de Negocios IBI-1011', subtitle: 'Sección A • 30 estudiantes', progress: 40 },
]

const PENDING_TASKS = [
  { student: 'Ana Martínez', task: 'Proyecto Final, React & Redux', initials: 'AM' },
  { student: 'Luis García', task: 'Lección 8: Ética en la IA', initials: 'LG' },
  { student: 'Elena Rivas', task: 'Laboratorio 9: SQL Queries', initials: 'ER' },
]

export default function ProfessorDashboardScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="menu-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SkillPath</Text>
        <View style={styles.avatarOrange}>
          <Ionicons name="person" size={16} color={colors.white} />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Bienvenido, Dr. Rivera</Text>
          <Text style={styles.greetingSub}>Tienes 3 clases programadas hoy. Tu jornada comienza en 45 minutos.</Text>
          <TouchableOpacity style={styles.announceBtn} activeOpacity={0.85}
            onPress={() => navigation.navigate('ProfessorAnnouncement')}>
            <Ionicons name="megaphone-outline" size={14} color={colors.white} />
            <Text style={styles.announceBtnText}>Publicar Anuncio</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="book-outline" size={20} color={colors.primary} style={styles.statIcon} />
            <Text style={styles.statValue}>06</Text>
            <Text style={styles.statLabel}>CURSOS ASIGNADOS</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={20} color={colors.accentViolet} style={styles.statIcon} />
            <Text style={[styles.statValue, { color: colors.accentViolet }]}>248</Text>
            <Text style={styles.statLabel}>ESTUDIANTES INSCRITOS</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.alertDot} />
            <Ionicons name="document-text-outline" size={20} color={colors.accentAmber} style={styles.statIcon} />
            <Text style={[styles.statValue, { color: colors.accentAmber }]}>14</Text>
            <Text style={styles.statLabel}>TAREAS POR CALIFICAR</Text>
          </View>
        </View>

        {/* Courses in progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cursos en Curso</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {COURSES.map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <View style={styles.courseThumbnail}>
                <Ionicons name="code-slash-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseSub}>{course.subtitle}</Text>
                <View style={styles.progressRow}>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${course.progress}%` as any }]} />
                  </View>
                  <Text style={styles.progressPct}>{course.progress}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Tasks to grade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tareas por Calificar</Text>
          {PENDING_TASKS.map((task, i) => (
            <TouchableOpacity
              key={i}
              style={styles.taskRow}
              onPress={() => navigation.navigate('ProfessorReview')}
              activeOpacity={0.7}
            >
              <View style={styles.taskAvatar}>
                <Text style={styles.taskAvatarText}>{task.initials}</Text>
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskStudent}>{task.student}</Text>
                <Text style={styles.taskTitle} numberOfLines={1}>{task.task}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}

          {/* Action required alert */}
          <View style={styles.alertBox}>
            <Ionicons name="warning-outline" size={16} color={colors.accentAmber} />
            <View style={styles.alertInfo}>
              <Text style={styles.alertTitle}>ACCIÓN REQUERIDA</Text>
              <Text style={styles.alertText}>
                Tienes 14 entregas acumuladas que vencen hoy para revisar. Protege los cursos de fin de ciclo.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <ProfessorBottomNavBar activeTab="ProfessorDashboard" navigation={navigation} />
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary },
  avatarOrange: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E07B39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  greeting: {
    backgroundColor: colors.primaryDark,
    padding: spacing.md,
    gap: spacing.xs,
  },
  greetingTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.white },
  greetingSub: { fontSize: fontSize.bodySm, color: 'rgba(255,255,255,0.7)', lineHeight: 20 },
  announceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 8,
    borderRadius: radius.md,
    marginTop: spacing.xs,
  },
  announceBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: 2,
    position: 'relative',
  },
  statIcon: { marginBottom: 2 },
  statValue: { fontSize: fontSize.headingMd, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 9, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.3 },
  alertDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accentAmber,
  },
  section: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  seeAll: { fontSize: fontSize.bodySm, color: colors.primary, fontWeight: '500' },
  courseCard: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  courseThumbnail: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseInfo: { flex: 1, gap: 4 },
  courseTitle: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.textPrimary },
  courseSub: { fontSize: fontSize.caption, color: colors.textMuted },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  progressTrack: { flex: 1, height: 6, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  progressPct: { fontSize: fontSize.caption, fontWeight: '600', color: colors.primary, width: 30 },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  taskAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskAvatarText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.avatarText },
  taskInfo: { flex: 1 },
  taskStudent: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  taskTitle: { fontSize: fontSize.caption, color: colors.textMuted },
  alertBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.progressBg,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accentAmber,
  },
  alertInfo: { flex: 1 },
  alertTitle: { fontSize: fontSize.caption, fontWeight: '700', color: colors.progressText, letterSpacing: 0.4 },
  alertText: { fontSize: fontSize.caption, color: colors.progressText, lineHeight: 18, marginTop: 2 },
})
