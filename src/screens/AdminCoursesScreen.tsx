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
import AdminBottomNavBar from '../components/AdminBottomNavBar'

type TabKey = 'Activos' | 'Borradores' | 'Archivados'

const TABS: { key: TabKey; count: number }[] = [
  { key: 'Activos', count: 12 },
  { key: 'Borradores', count: 4 },
  { key: 'Archivados', count: 28 },
]

const COURSES = {
  Activos: [
    {
      id: '1',
      title: 'Análisis de Datos Avanzado',
      subtitle: 'Actualizado hace 2 días • 1,241 estudiantes',
      rating: '4.8',
      status: 'ACTIVO',
      color: colors.activeBg,
      statusColor: colors.activeText,
    },
    {
      id: '2',
      title: 'Ciberseguridad Proactiva',
      subtitle: 'Actualizado hace • 500 resultados',
      rating: '4.9',
      status: 'ACTIVO',
      color: colors.activeBg,
      statusColor: colors.activeText,
    },
  ],
  Borradores: [
    {
      id: '3',
      title: 'Liderazgo en Equipos Remotos',
      subtitle: 'Creado hace 1 semana • No publicado',
      rating: null,
      status: 'BORRADOR',
      color: colors.progressBg,
      statusColor: colors.progressText,
    },
  ],
  Archivados: [
    {
      id: '4',
      title: 'Fundamentos de Office 2016',
      subtitle: 'Archivado 12/03/04',
      rating: null,
      status: 'RESTAURAR',
      color: colors.lockedBg,
      statusColor: colors.lockedText,
    },
  ],
}

export default function AdminCoursesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<TabKey>('Activos')

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="menu-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SkillPath</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AD</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page title */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.pageTitle}>Gestión de Cursos</Text>
            <Text style={styles.pageSub}>Administra el catálogo académico y el ciclo de vida de los cursos</Text>
          </View>
          <TouchableOpacity
            style={styles.newBtn}
            onPress={() => navigation.navigate('AdminCreateCourse')}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={16} color={colors.white} />
            <Text style={styles.newBtnText}>Nuevo Curso</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.key}
              </Text>
              <View style={[styles.tabBadge, activeTab === tab.key && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, activeTab === tab.key && styles.tabBadgeTextActive]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Course cards */}
        <View style={styles.listSection}>
          {(COURSES[activeTab] ?? []).map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <View style={[styles.courseThumbnail, { backgroundColor: course.color }]}>
                <Ionicons name="book-outline" size={28} color={colors.primary} />
              </View>
              <View style={styles.courseInfo}>
                <View style={styles.courseTopRow}>
                  <View style={[styles.statusBadge, { backgroundColor: course.color }]}>
                    <Text style={[styles.statusText, { color: course.statusColor }]}>{course.status}</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseSub}>{course.subtitle}</Text>
                {course.rating && (
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color={colors.accentAmber} />
                    <Text style={styles.ratingText}>{course.rating}</Text>
                  </View>
                )}
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.cardActionBtn}>
                    <Ionicons name="create-outline" size={16} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cardActionBtn}>
                    <Ionicons name="copy-outline" size={16} color={colors.primary} />
                  </TouchableOpacity>
                  {activeTab === 'Activos' && (
                    <TouchableOpacity
                      style={styles.cardActionBtn}
                      onPress={() => navigation.navigate('AdminConfirmAction')}
                    >
                      <Ionicons name="archive-outline" size={16} color={colors.danger} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Monthly summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen Mensual</Text>
          <Text style={styles.summarySub}>Rendimiento global de la academia</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>15%</Text>
              <Text style={styles.summaryLabel}>inscripciones</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.accentViolet }]}>4.8</Text>
              <Text style={styles.summaryLabel}>satisfacción promedio</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reportBtn} activeOpacity={0.85}>
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
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerBtn: { padding: spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary },
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  pageSub: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2, maxWidth: 200 },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  newBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  tabText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  tabBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  tabBadgeActive: { backgroundColor: colors.primary },
  tabBadgeText: { fontSize: 10, fontWeight: '600', color: colors.textMuted },
  tabBadgeTextActive: { color: colors.white },
  listSection: { paddingHorizontal: spacing.md, gap: spacing.sm },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  courseThumbnail: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  courseInfo: { flex: 1, padding: spacing.sm },
  courseTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full },
  statusText: { fontSize: fontSize.caption, fontWeight: '600' },
  courseTitle: { fontSize: fontSize.body, fontWeight: '600', color: colors.textPrimary },
  courseSub: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  ratingText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textPrimary },
  cardActions: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.sm },
  cardActionBtn: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  summaryTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.white },
  summarySub: { fontSize: fontSize.caption, color: 'rgba(255,255,255,0.6)', marginTop: 2, marginBottom: spacing.sm },
  summaryStats: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: fontSize.headingLg, fontWeight: '700', color: colors.white },
  summaryLabel: { fontSize: fontSize.caption, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
  summaryDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)' },
  reportBtn: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: 'center',
  },
  reportBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.primaryDark },
})
