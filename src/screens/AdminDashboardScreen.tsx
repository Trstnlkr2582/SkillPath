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

const STATS = [
  {
    label: 'USUARIOS TOTALES',
    value: '12,480',
    delta: '+12%',
    deltaPos: true,
    icon: 'people-outline',
    iconBg: colors.primaryLight,
    iconColor: colors.successText,
  },
  {
    label: 'ESTUDIANTES ACTIVOS',
    value: '8,822',
    delta: null,
    icon: 'school-outline',
    iconBg: colors.primaryLight,
    iconColor: colors.successText,
  },
  {
    label: 'PROFESORES',
    value: '156',
    delta: null,
    icon: 'person-outline',
    iconBg: colors.progressBg,
    iconColor: colors.accentAmber,
  },
]

const QUICK_ACCESS = [
  { label: 'Gestionar Catálogo', icon: 'book-outline', screen: 'AdminCourses', danger: false },
  { label: 'Verificar Certificados', icon: 'ribbon-outline', screen: 'AdminCourses', danger: false },
  { label: 'Comunicados Masivos', icon: 'megaphone-outline', screen: 'AdminAnnouncement', danger: false },
  { label: 'Reportes Críticos', icon: 'warning-outline', screen: 'AdminReports', danger: true },
]

const RECENT_ACTIVITY = [
  { user: 'Juan Delgado', initials: 'JD', avatarBg: colors.primaryLight, action: 'Completó certificación', course: 'Py... Ma...' },
  { user: 'María Alva', initials: 'MA', avatarBg: colors.credentialBg, action: 'Inscripción nueva', course: 'Dis... Es...' },
  { user: 'Roberto Castillo', initials: 'RC', avatarBg: colors.progressBg, action: 'Reportó problema', course: 'For... Av...' },
]

const BARS = [
  { label: 'Semana 1', h: 60 },
  { label: 'Semana 2', h: 85 },
  { label: 'Semana 3', h: 50 },
  { label: 'Semana 4', h: 95 },
]

export default function AdminDashboardScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Buenos días, Administrador</Text>
          <Text style={styles.greetingSub}>Aquí tienes el resumen de rendimiento académico de hoy.</Text>
        </View>

        <View style={styles.content}>
          {STATS.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={styles.statLeft}>
                <Text style={styles.statLabel}>{s.label}</Text>
                {s.delta && (
                  <View style={[styles.deltaBadge, s.deltaPos ? styles.deltaPos : styles.deltaNeg]}>
                    <Text style={[styles.deltaText, s.deltaPos ? styles.deltaPosText : styles.deltaNegText]}>
                      {s.delta}
                    </Text>
                  </View>
                )}
                <Text style={styles.statValue}>{s.value}</Text>
              </View>
              <View style={[styles.statIconBox, { backgroundColor: s.iconBg }]}>
                <Ionicons name={s.icon as any} size={22} color={s.iconColor} />
              </View>
            </View>
          ))}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tendencia de Inscripciones</Text>
              <TouchableOpacity style={styles.filterChip} onPress={() => Alert.alert('Período', 'Selecciona el período de análisis.')}>
                <Text style={styles.filterChipText}>Últimos 30 días</Text>
                <Ionicons name="chevron-down" size={12} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
            <View style={styles.chartContainer}>
              {BARS.map((bar, i) => (
                <View key={i} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: bar.h * 0.85 }]} />
                  <Text style={styles.barLabel}>{bar.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
            <View style={styles.quickList}>
              {QUICK_ACCESS.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.quickRow,
                    i < QUICK_ACCESS.length - 1 && styles.quickRowBorder,
                  ]}
                  onPress={() => item.screen && navigation.navigate(item.screen)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={item.danger ? colors.accentAmber : colors.textMuted}
                  />
                  <Text style={[styles.quickLabel, item.danger && styles.quickLabelDanger]}>
                    {item.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={item.danger ? colors.danger : colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Actividad reciente de usuarios</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AdminUsers')}>
                <Text style={styles.seeAll}>Ver todo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityTable}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>USUARIO</Text>
                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>ACCIÓN</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>CU...</Text>
              </View>
              {RECENT_ACTIVITY.map((row, i) => (
                <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
                  <View style={[styles.userCell, { flex: 2 }]}>
                    <View style={[styles.miniAvatar, { backgroundColor: row.avatarBg }]}>
                      <Text style={styles.miniAvatarText}>{row.initials}</Text>
                    </View>
                    <Text style={styles.cellText} numberOfLines={1}>{row.user}</Text>
                  </View>
                  <Text style={[styles.cellText, { flex: 2 }]} numberOfLines={1}>{row.action}</Text>
                  <Text style={[styles.cellText, { flex: 1, color: colors.primary }]} numberOfLines={1}>{row.course}</Text>
                </View>
              ))}
            </View>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuBtn: { padding: spacing.xs, gap: 4 },
  menuLine: { width: 20, height: 2, borderRadius: 1, backgroundColor: colors.textPrimary },
  brand: { fontSize: 18, fontWeight: '700', color: colors.primary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  iconBtn: { padding: spacing.xs },
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
  greeting: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: 4,
  },
  greetingTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  greetingSub: { fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
  content: { paddingHorizontal: spacing.md, gap: spacing.sm },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  statLeft: { flex: 1, gap: 4 },
  statLabel: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.4 },
  deltaBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.sm },
  deltaPos: { backgroundColor: colors.activeBg },
  deltaNeg: { backgroundColor: colors.errorBg },
  deltaText: { fontSize: fontSize.caption, fontWeight: '600' },
  deltaPosText: { color: colors.activeText },
  deltaNegText: { color: colors.errorText },
  statValue: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
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
    height: 100,
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  barWrapper: { flex: 1, alignItems: 'center', gap: 6 },
  bar: { width: '80%', backgroundColor: colors.primaryDark, borderRadius: radius.sm },
  barLabel: { fontSize: 9, color: colors.textMuted, textAlign: 'center' },
  quickList: { marginTop: spacing.xs },
  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 12,
  },
  quickRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  quickLabel: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  quickLabelDanger: { color: colors.danger },
  activityTable: {
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  tableHeaderCell: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted },
  tableRow: { flexDirection: 'row', paddingHorizontal: spacing.sm, paddingVertical: 10, alignItems: 'center' },
  tableRowAlt: { backgroundColor: '#FAFCFB' },
  userCell: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniAvatarText: { fontSize: 10, fontWeight: '600', color: colors.successText },
  cellText: { fontSize: fontSize.bodySm, color: colors.textPrimary },
})
