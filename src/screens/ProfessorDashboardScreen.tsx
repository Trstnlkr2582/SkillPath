import React, { useState } from 'react'
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
import { useAuth } from '../context/AuthContext'

const COURSES = [
  { id: '1', title: 'Desarrollo Web Avanzado (CS-204)', subtitle: 'Sección B · 42 estudiantes', progress: 65 },
  { id: '2', title: 'Inteligencia de Negocios (BI-101)', subtitle: 'Sección A · 38 estudiantes', progress: 40 },
]

const PENDING_TASKS = [
  { student: 'Ana Martínez', task: 'Proyecto Final: React & Redux', initials: 'AM', bg: '#7C3AED' },
  { student: 'Luis García', task: 'Ensayo: Ética en la IA', initials: 'LG', bg: '#0891B2' },
  { student: 'Elena Rivas', task: 'Laboratorio 4: SQL Queries', initials: 'ER', bg: '#059669' },
]

const STATS = [
  { icon: 'school-outline', iconBg: colors.primaryLight, iconColor: colors.successText, value: '06', label: 'CURSOS ASIGNADOS', badge: null },
  { icon: 'people-outline', iconBg: colors.credentialBg, iconColor: colors.accentViolet, value: '248', label: 'ESTUDIANTES INSCRITOS', badge: null },
  { icon: 'document-text-outline', iconBg: colors.progressBg, iconColor: colors.accentAmber, value: '14', label: 'TAREAS POR CALIFICAR', badge: 'Ámbar' },
]

export default function ProfessorDashboardScreen({ navigation }: any) {
  const { user } = useAuth()
  const displayName = user?.name ?? 'Dr. Rivera'

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Bienvenido, {displayName}</Text>
          <Text style={styles.greetingSub}>Tienes 3 clases programadas hoy. Tu jornada comienza en 45 minutos.</Text>
          <TouchableOpacity
            style={styles.announceBtn}
            onPress={() => navigation.navigate('ProfessorAnnouncement')}
            activeOpacity={0.85}
          >
            <Ionicons name="megaphone-outline" size={14} color={colors.white} />
            <Text style={styles.announceBtnText}>Publicar Anuncio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Stat cards */}
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: stat.iconBg }]}>
                <Ionicons name={stat.icon as any} size={22} color={stat.iconColor} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              {stat.badge && (
                <View style={styles.ambarBadge}>
                  <Text style={styles.ambarBadgeText}>{stat.badge}</Text>
                </View>
              )}
            </View>
          ))}

          {/* Cursos en curso */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Cursos en Curso</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ProfessorStudentsList')}>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            {COURSES.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => navigation.navigate('ProfessorStudentsList')}
                activeOpacity={0.85}
              >
                <View style={styles.courseCover}>
                  <Ionicons name="laptop-outline" size={20} color="rgba(255,255,255,0.5)" />
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                  <Text style={styles.courseSub}>{course.subtitle}</Text>
                  <View style={styles.courseProgressRow}>
                    <Text style={styles.courseProgressLabel}>Progreso del programa</Text>
                    <Text style={styles.courseProgressPct}>{course.progress}%</Text>
                  </View>
                  <View style={styles.courseProgressTrack}>
                    <View style={[styles.courseProgressFill, { width: `${course.progress}%` as any }]} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tareas por calificar */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tareas por Calificar</Text>
            <View style={styles.taskList}>
              {PENDING_TASKS.map((t, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.taskRow, i < PENDING_TASKS.length - 1 && styles.taskRowBorder]}
                  onPress={() => navigation.navigate('ProfessorReview')}
                  activeOpacity={0.8}
                >
                  <View style={[styles.taskAvatar, { backgroundColor: t.bg }]}>
                    <Text style={styles.taskAvatarText}>{t.initials}</Text>
                  </View>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskStudent}>{t.student}</Text>
                    <Text style={styles.taskName}>{t.task}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Alert banner */}
          <View style={styles.alertBanner}>
            <Ionicons name="warning-outline" size={16} color={colors.accentAmber} style={{ marginTop: 1 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>ACCIÓN REQUERIDA</Text>
              <Text style={styles.alertText}>
                Tienes 14 entregas acumuladas que vencen hoy para revisión. Prioriza los cursos de fin de ciclo.
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuBtn: { padding: spacing.xs, gap: 4 },
  menuLine: { width: 20, height: 2, borderRadius: 1, backgroundColor: colors.textPrimary },
  brand: { fontSize: 18, fontWeight: '700', color: colors.primary },
  avatarBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.accentAmber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '700', color: colors.white },
  scroll: { flex: 1 },
  greeting: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    paddingBottom: 20,
    gap: 8,
  },
  greetingTitle: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, lineHeight: 32 },
  greetingSub: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 20 },
  announceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    height: 44,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    marginTop: 4,
  },
  announceBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  content: { padding: spacing.md, gap: spacing.sm },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statInfo: { flex: 1 },
  statValue: { fontSize: 32, fontWeight: '700', color: colors.textPrimary },
  statLabel: { fontSize: 11, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.4 },
  ambarBadge: {
    backgroundColor: colors.progressBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  ambarBadgeText: { fontSize: 11, fontWeight: '500', color: colors.progressText },
  section: { gap: spacing.sm },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  seeAll: { fontSize: fontSize.bodySm, color: colors.primary, fontWeight: '500' },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 12,
  },
  courseCover: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  courseInfo: { flex: 1, gap: 4 },
  courseTitle: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, lineHeight: 18 },
  courseSub: { fontSize: 12, color: colors.textMuted },
  courseProgressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  courseProgressLabel: { fontSize: 11, color: colors.textMuted },
  courseProgressPct: { fontSize: 11, fontWeight: '600', color: colors.successText },
  courseProgressTrack: { height: 5, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden', marginTop: 2 },
  courseProgressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  taskList: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  taskRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  taskAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  taskAvatarText: { fontSize: 12, fontWeight: '700', color: colors.white },
  taskInfo: { flex: 1 },
  taskStudent: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  taskName: { fontSize: 12, color: colors.textMuted, marginTop: 1 },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.progressBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentAmber + '40',
    padding: 14,
  },
  alertTitle: { fontSize: 11, fontWeight: '700', color: colors.progressText, letterSpacing: 0.5, marginBottom: 3 },
  alertText: { fontSize: 13, color: colors.progressText, lineHeight: 18 },
})
