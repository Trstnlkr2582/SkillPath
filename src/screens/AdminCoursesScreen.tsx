import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import AdminBottomNavBar from '../components/AdminBottomNavBar'

type TabKey = 'Activos' | 'Borradores' | 'Archivados'

const TABS: { key: TabKey; count: number }[] = [
  { key: 'Activos', count: 12 },
  { key: 'Borradores', count: 4 },
  { key: 'Archivados', count: 28 },
]

type Course = {
  id: string
  title: string
  subtitle: string
  status: TabKey
  badgeLabel: string
  badgeBg: string
  badgeColor: string
  imageBg: string
  rating?: string
  progress?: number
  archived?: boolean
}

const ALL_COURSES: Course[] = [
  {
    id: '1',
    title: 'Análisis de Datos Avanzado',
    subtitle: 'Actualizado hace 2 días · 1,240 estudiantes',
    status: 'Activos',
    badgeLabel: 'ACTIVO',
    badgeBg: colors.activeBg,
    badgeColor: colors.activeText,
    imageBg: '#1A3D33',
    progress: 72,
  },
  {
    id: '2',
    title: 'Liderazgo en Equipos Remotos',
    subtitle: 'Creado hace 1 semana · No publicado',
    status: 'Borradores',
    badgeLabel: 'BORRADOR',
    badgeBg: colors.progressBg,
    badgeColor: colors.progressText,
    imageBg: '#2C2C3E',
    progress: 95,
  },
  {
    id: '3',
    title: 'Ciberseguridad Proactiva',
    subtitle: 'Actualizado ayer · 850 estudiantes',
    status: 'Activos',
    badgeLabel: 'ACTIVO',
    badgeBg: colors.activeBg,
    badgeColor: colors.activeText,
    imageBg: '#1A2B3C',
    rating: '4.9',
  },
  {
    id: '4',
    title: 'Fundamentos de Office 2016',
    subtitle: 'Retirado el 31/11/XX',
    status: 'Archivados',
    badgeLabel: 'ARCHIVADO',
    badgeBg: colors.lockedBg,
    badgeColor: colors.lockedText,
    imageBg: colors.border,
    archived: true,
  },
]

export default function AdminCoursesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<TabKey>('Activos')

  const filtered = ALL_COURSES.filter((c) => c.status === activeTab)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Gestión de Cursos</Text>
          <Text style={styles.pageSub}>
            Administra el catálogo académico y el ciclo de vida de los contenidos.
          </Text>
          <TouchableOpacity
            style={styles.newBtn}
            onPress={() => navigation.navigate('AdminCreateCourse')}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={16} color={colors.white} />
            <Text style={styles.newBtnText}>Nuevo Curso</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.key} ({tab.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.listSection}>
          {filtered.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => navigation.navigate('AdminCourseDetail')}
              activeOpacity={0.9}
            >
              {/* Image area */}
              <View style={[styles.courseImage, { backgroundColor: course.imageBg }]}>
                <View style={[styles.courseBadge, { backgroundColor: course.badgeBg }]}>
                  <Text style={[styles.courseBadgeText, { color: course.badgeColor }]}>
                    {course.badgeLabel}
                  </Text>
                </View>
                <TouchableOpacity style={styles.menuDotBtn} onPress={() => Alert.alert(course.title, 'Opciones: Editar, Duplicar o Archivar este curso.')}>
                  <Ionicons name="ellipsis-vertical" size={18} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
                {course.archived && (
                  <View style={styles.archivedCenter}>
                    <Ionicons name="archive-outline" size={32} color={colors.border} />
                  </View>
                )}
              </View>

              {/* Content */}
              <View style={styles.courseContent}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseSub}>{course.subtitle}</Text>

                <View style={styles.courseFooter}>
                  <View style={styles.actionIcons}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('AdminCourseDetail')}>
                      <Ionicons name="create-outline" size={16} color={colors.primary} />
                    </TouchableOpacity>
                    {!course.archived && (
                      <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('Duplicar', `Se duplicó "${course.title}"`)}>
                        <Ionicons name="copy-outline" size={16} color={colors.primary} />
                      </TouchableOpacity>
                    )}
                    {course.status === 'Activos' && (
                      <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.navigate('AdminConfirmAction')}
                      >
                        <Ionicons name="bar-chart-outline" size={16} color={colors.primary} />
                      </TouchableOpacity>
                    )}
                  </View>

                  {course.rating && (
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={12} color={colors.accentAmber} />
                      <Text style={styles.ratingText}>{course.rating}</Text>
                    </View>
                  )}
                  {course.progress !== undefined && (
                    <View style={styles.progressArea}>
                      {course.status === 'Borradores' ? (
                        <Text style={styles.progressLabel}>{course.progress}% COMPLETADO</Text>
                      ) : (
                        <View style={styles.progressTrack}>
                          <View style={[styles.progressFill, { width: `${course.progress}%` as any }]} />
                        </View>
                      )}
                    </View>
                  )}
                  {course.archived && (
                    <TouchableOpacity onPress={() => Alert.alert('Restaurar', `"${course.title}" ha sido restaurado al catálogo.`)}>
                      <Text style={styles.restoreLink}>RESTAURAR</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen Mensual</Text>
          <Text style={styles.summarySub}>Rendimiento global de la academia</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryPct}>15%</Text>
              <Text style={styles.summaryLabel}>INCREMENTO{'\n'}INSCRIPCIONES</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryPct, { color: colors.white }]}>4.8</Text>
              <Text style={styles.summaryLabel}>SATISFACCIÓN{'\n'}PROMEDIO</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.reportBtn}
            onPress={() => navigation.navigate('AdminReports')}
            activeOpacity={0.85}
          >
            <Text style={styles.reportBtnText}>Ver Reporte Detallado</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <AdminBottomNavBar activeTab="AdminCourses" navigation={navigation} />
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
    gap: spacing.sm,
  },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  pageSub: { fontSize: fontSize.caption, color: colors.textMuted, lineHeight: 18 },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    height: 44,
  },
  newBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  tabText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textMuted },
  tabTextActive: { color: colors.primary, fontWeight: '600' },
  listSection: { paddingHorizontal: spacing.md, gap: spacing.md },
  courseCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  courseImage: {
    height: 120,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: spacing.sm,
    alignItems: 'flex-start',
  },
  courseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  courseBadgeText: { fontSize: fontSize.caption, fontWeight: '700' },
  menuDotBtn: { padding: 4 },
  archivedCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseContent: { padding: spacing.sm, gap: spacing.xs },
  courseTitle: { fontSize: fontSize.body, fontWeight: '600', color: colors.textPrimary },
  courseSub: { fontSize: fontSize.caption, color: colors.textMuted },
  courseFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  actionIcons: { flexDirection: 'row', gap: spacing.xs },
  actionBtn: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.textPrimary },
  progressArea: { flex: 1, alignItems: 'flex-end' },
  progressLabel: { fontSize: fontSize.caption, fontWeight: '600', color: colors.primary },
  progressTrack: { width: 80, height: 5, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  restoreLink: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.primary },
  summaryCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  summaryTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.white },
  summarySub: { fontSize: fontSize.caption, color: 'rgba(255,255,255,0.6)' },
  summaryStats: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center', gap: 2 },
  summaryPct: { fontSize: fontSize.headingLg, fontWeight: '700', color: colors.accentAmber },
  summaryLabel: { fontSize: fontSize.caption, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 16 },
  summaryDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' },
  reportBtn: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  reportBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.primaryDark },
})
