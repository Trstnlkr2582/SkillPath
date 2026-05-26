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

const KPI_CARDS = [
  { label: 'INSCRIPCIONES TOTALES', value: '12.4k', delta: '+14%', pos: true },
  { label: 'TASA DE FINALIZACIÓN', value: '68.2%', delta: '+3.1%', pos: true },
  { label: 'ESTUDIANTES ACTIVOS', value: '4,892', delta: '-2%', pos: false },
  { label: 'CERTIFICACIONES', value: '2,105', delta: '+22%', pos: true, valueColor: colors.accentViolet },
]

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
const BAR_2024 = [55, 70, 45, 85, 65, 90]
const BAR_2023 = [40, 55, 35, 60, 50, 70]

const PROGRESS_ITEMS = [
  { label: 'Completados', pct: 68, color: colors.primary },
  { label: 'En Curso', pct: 24, color: colors.accentAmber },
  { label: 'Abandonados', pct: 8, color: colors.danger },
]

const TOP_COURSES = [
  { title: 'Desarrollo Web Fullstack', instructor: 'Dra. Helena Rivas', icon: 'code-slash-outline' },
  { title: 'Inteligencia Artificial Aplicada', instructor: 'Mtro. Jorge Linares', icon: 'hardware-chip-outline' },
  { title: 'Finanzas para Negocios Digitales', instructor: 'Lic. Sofía Chan', icon: 'cash-outline' },
]

export default function AdminReportsScreen({ navigation }: any) {
  const [period] = useState('Últimos 30 días')

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Analítica Institucional</Text>
          <Text style={styles.pageSub}>Resumen avanzado del rendimiento académico y operativo.</Text>
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.periodBtn} onPress={() => Alert.alert('Período', 'Selecciona el período del reporte.')}>
            <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
            <Text style={styles.periodBtnText}>{period}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportBtn} activeOpacity={0.85} onPress={() => Alert.alert('Exportar', 'Generando reporte PDF...')}>
            <Ionicons name="arrow-up-outline" size={14} color={colors.primary} />
            <Text style={styles.exportBtnText}>Exportar PDF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.kpiList}>
          {KPI_CARDS.map((kpi, i) => (
            <View key={i} style={styles.kpiCard}>
              <View style={styles.kpiLeft}>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
                <Text style={[styles.kpiValue, kpi.valueColor ? { color: kpi.valueColor } : undefined]}>
                  {kpi.value}
                </Text>
              </View>
              <View style={[styles.kpiDelta, kpi.pos ? styles.deltaPos : styles.deltaNeg]}>
                <Text style={[styles.kpiDeltaText, kpi.pos ? styles.deltaPosText : styles.deltaNegText]}>
                  {kpi.delta}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Inscripción Mensual</Text>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={styles.legendText}>2024</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.border }]} />
                <Text style={styles.legendText}>2023</Text>
              </View>
            </View>
          </View>
          <View style={styles.chartContainer}>
            {MONTHS.map((month, i) => (
              <View key={i} style={styles.barGroup}>
                <View style={styles.barsWrapper}>
                  <View style={[styles.bar, { height: BAR_2023[i] * 0.65, backgroundColor: colors.border }]} />
                  <View style={[styles.bar, { height: BAR_2024[i] * 0.65, backgroundColor: colors.primary }]} />
                </View>
                <Text style={styles.barLabel}>{month}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estado de Progreso</Text>
          <View style={styles.progressList}>
            {PROGRESS_ITEMS.map((item, i) => (
              <View key={i} style={styles.progressItem}>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>{item.label}</Text>
                  <Text style={[styles.progressPct, { color: item.color }]}>{item.pct}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${item.pct}%` as any, backgroundColor: item.color }]} />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.graduatesRow}>
            <View style={styles.graduateAvatars}>
              {['A', 'B'].map((l, i) => (
                <View key={i} style={[styles.gradAvatar, { marginLeft: i > 0 ? -8 : 0 }]}>
                  <Text style={styles.gradAvatarText}>{l}</Text>
                </View>
              ))}
              <View style={[styles.gradAvatar, { marginLeft: -8, backgroundColor: colors.surface }]}>
                <Text style={styles.gradAvatarMore}>+12</Text>
              </View>
            </View>
            <Text style={styles.graduatesLabel}>Graduados hoy</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ranking de Cursos Populares</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AdminCourses')}>
              <Text style={styles.seeAll}>Ver todos ›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.courseTable}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Curso</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Instructor</Text>
            </View>
            {TOP_COURSES.map((c, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
                <View style={[styles.courseCell, { flex: 2 }]}>
                  <View style={styles.courseIcon}>
                    <Ionicons name={c.icon as any} size={14} color={colors.primary} />
                  </View>
                  <Text style={styles.courseTitle} numberOfLines={1}>{c.title}</Text>
                </View>
                <Text style={[styles.instructorText, { flex: 1.5 }]} numberOfLines={1}>{c.instructor}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <AdminBottomNavBar activeTab="AdminReports" navigation={navigation} />
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
  titleSection: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xs, gap: 4 },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  pageSub: { fontSize: fontSize.caption, color: colors.textMuted, lineHeight: 18 },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  periodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodBtnText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  exportBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.primary },
  kpiList: { paddingHorizontal: spacing.md, marginTop: spacing.sm, gap: spacing.sm },
  kpiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  kpiLeft: { flex: 1, gap: 4 },
  kpiLabel: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.3 },
  kpiValue: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  kpiDelta: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.sm },
  deltaPos: { backgroundColor: colors.activeBg },
  deltaNeg: { backgroundColor: colors.errorBg },
  kpiDeltaText: { fontSize: fontSize.caption, fontWeight: '600' },
  deltaPosText: { color: colors.activeText },
  deltaNegText: { color: colors.errorText },
  section: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  seeAll: { fontSize: fontSize.bodySm, color: colors.primary, fontWeight: '500' },
  legend: { flexDirection: 'row', gap: spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: fontSize.caption, color: colors.textMuted },
  chartContainer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 80 },
  barGroup: { flex: 1, alignItems: 'center', gap: 4 },
  barsWrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 2 },
  bar: { width: 10, borderRadius: radius.sm },
  barLabel: { fontSize: 9, color: colors.textMuted },
  progressList: { gap: spacing.sm },
  progressItem: { gap: 4 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: fontSize.body, color: colors.textPrimary },
  progressPct: { fontSize: fontSize.body, fontWeight: '600' },
  progressTrack: { height: 8, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  graduatesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  graduateAvatars: { flexDirection: 'row' },
  gradAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  gradAvatarText: { fontSize: 10, fontWeight: '600', color: colors.avatarText },
  gradAvatarMore: { fontSize: 8, fontWeight: '600', color: colors.textMuted },
  graduatesLabel: { fontSize: fontSize.bodySm, color: colors.textMuted },
  courseTable: { borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 8 },
  tableHeaderCell: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted },
  tableRow: { flexDirection: 'row', paddingHorizontal: spacing.sm, paddingVertical: 10, alignItems: 'center' },
  tableRowAlt: { backgroundColor: '#FAFCFB' },
  courseCell: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  courseIcon: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseTitle: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary, flex: 1 },
  instructorText: { fontSize: fontSize.caption, color: colors.textMuted },
})
