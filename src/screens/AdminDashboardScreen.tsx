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
import AdminBottomNavBar from '../components/AdminBottomNavBar'

const STATS = [
  { label: 'USUARIOS TOTALES', value: '12,480', delta: '+9%', deltaPositive: true, icon: 'people-outline' },
  { label: 'ESTUDIANTES ACTIVOS', value: '8,922', icon: 'school-outline' },
  { label: 'PROFESORES', value: '156', icon: 'person-outline' },
]

const QUICK_ACCESS = [
  { label: 'Gestionar Catálogo', icon: 'book-outline', screen: 'AdminCourses', danger: false },
  { label: 'Verificar Certificados', icon: 'ribbon-outline', screen: null, danger: false },
  { label: 'Comunicados Masivos', icon: 'megaphone-outline', screen: null, danger: false },
  { label: 'Reportes Críticos', icon: 'warning-outline', screen: 'AdminReports', danger: true },
]

const RECENT_ACTIVITY = [
  { user: 'Juan Delgado', action: 'Completó certificación', course: 'Py...' },
  { user: 'María Alva', action: 'Inscripción nueva', course: 'Di...' },
  { user: 'Roberto Castillo', action: 'Reportó problema', course: 'Fo...' },
]

const BAR_DATA = [65, 80, 55, 90, 70, 85, 60, 95]

export default function AdminDashboardScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="menu-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SkillPath</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AD</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Buenos días, Administrador</Text>
          <Text style={styles.greetingSub}>Aquí tienes el resumen de rendimiento académico de hoy.</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <View key={i} style={[styles.statCard, i === 0 && styles.statCardWide]}>
              <View style={styles.statTop}>
                <Text style={styles.statLabel}>{s.label}</Text>
                {s.delta && (
                  <Text style={[styles.delta, s.deltaPositive ? styles.deltaPos : styles.deltaNeg]}>
                    {s.delta}
                  </Text>
                )}
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <View style={styles.statIconBox}>
                <Ionicons name={s.icon as any} size={18} color={colors.primary} />
              </View>
            </View>
          ))}
        </View>

        {/* Enrollment trend */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tendencia de Inscripciones</Text>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Últimos 30 días</Text>
              <Ionicons name="chevron-down" size={12} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          <View style={styles.chartContainer}>
            {BAR_DATA.map((h, i) => (
              <View key={i} style={styles.barWrapper}>
                <View style={[styles.bar, { height: h * 0.9 }]} />
                <Text style={styles.barLabel}>S{i + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
          <View style={styles.quickGrid}>
            {QUICK_ACCESS.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.quickItem, item.danger && styles.quickItemDanger]}
                onPress={() => item.screen && navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={item.danger ? colors.danger : colors.primary}
                />
                <Text style={[styles.quickLabel, item.danger && styles.quickLabelDanger]}>
                  {item.label}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={item.danger ? colors.danger : colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Actividad reciente de usuarios</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>USUARIO</Text>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>ACCIÓN</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>CUR.</Text>
            </View>
            {RECENT_ACTIVITY.map((row, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
                <View style={[styles.tableCell, { flex: 2, flexDirection: 'row', gap: 6, alignItems: 'center' }]}>
                  <View style={styles.miniAvatar}>
                    <Text style={styles.miniAvatarText}>{row.user[0]}</Text>
                  </View>
                  <Text style={styles.tableCellText} numberOfLines={1}>{row.user}</Text>
                </View>
                <Text style={[styles.tableCellText, { flex: 2 }]} numberOfLines={1}>{row.action}</Text>
                <Text style={[styles.tableCellText, { flex: 1, color: colors.primary }]}>{row.course}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <AdminBottomNavBar activeTab="AdminDashboard" navigation={navigation} />
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
  greeting: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  greetingTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  greetingSub: { fontSize: fontSize.bodySm, color: colors.textMuted, marginTop: 4 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm + 2,
    position: 'relative',
  },
  statCardWide: { minWidth: '100%' },
  statTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  statLabel: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.3 },
  statValue: { fontSize: fontSize.headingLg, fontWeight: '700', color: colors.textPrimary },
  delta: { fontSize: fontSize.caption, fontWeight: '600', paddingHorizontal: 6, paddingVertical: 2, borderRadius: radius.sm },
  deltaPos: { backgroundColor: colors.activeBg, color: colors.activeText },
  deltaNeg: { backgroundColor: colors.errorBg, color: colors.errorText },
  statIconBox: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  filterChip: {
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
  filterChipText: { fontSize: fontSize.caption, color: colors.textMuted },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
    marginTop: spacing.sm,
  },
  barWrapper: { flex: 1, alignItems: 'center', gap: 4 },
  bar: { width: '70%', backgroundColor: colors.primary, borderRadius: radius.sm },
  barLabel: { fontSize: 8, color: colors.textMuted },
  quickGrid: { gap: spacing.xs, marginTop: spacing.xs },
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickItemDanger: { backgroundColor: colors.errorBg, borderColor: '#F5C6C6' },
  quickLabel: { flex: 1, fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  quickLabelDanger: { color: colors.danger },
  activityTable: { marginTop: spacing.xs, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 8 },
  tableHeaderCell: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted },
  tableRow: { flexDirection: 'row', paddingHorizontal: spacing.sm, paddingVertical: 10, alignItems: 'center' },
  tableRowAlt: { backgroundColor: '#FAFCFB' },
  tableCell: {},
  tableCellText: { fontSize: fontSize.bodySm, color: colors.textPrimary },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniAvatarText: { fontSize: 10, fontWeight: '600', color: colors.avatarText },
})
