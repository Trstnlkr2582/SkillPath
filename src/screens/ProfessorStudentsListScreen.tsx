import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import ProfessorBottomNavBar from '../components/ProfessorBottomNavBar'

const STUDENTS = [
  { initials: 'AL', name: 'Alejandro Luna', progress: 75, color: colors.avatarBg, delivered: true },
  { initials: 'BC', name: 'Beatriz Castillo', progress: 60, color: '#D6E4FF', delivered: true },
  { initials: 'DM', name: 'Daniel Mendoza', progress: 45, color: '#FFE5D6', delivered: false },
]

const BADGES = [
  { label: 'SQL Master', color: colors.accentViolet, bg: colors.credentialBg },
  { label: 'Algorithms Pro', color: colors.activeText, bg: colors.activeBg },
  { label: 'Rápido Aprendiz', color: colors.accentAmber, bg: colors.progressBg },
]

const DELIVERY_OPTIONS = ['Estado de Entrega', 'Entregado', 'Pendiente']
const PROGRESS_OPTIONS = ['Progreso', 'Alto (>60%)', 'Bajo (≤60%)']

export default function ProfessorStudentsListScreen({ navigation }: any) {
  const [search, setSearch] = useState('')
  const [deliveryIdx, setDeliveryIdx] = useState(0)
  const [progressIdx, setProgressIdx] = useState(0)

  const deliveryFilter = DELIVERY_OPTIONS[deliveryIdx]
  const progressFilter = PROGRESS_OPTIONS[progressIdx]

  const filtered = STUDENTS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchDelivery = deliveryFilter === 'Estado de Entrega' || (deliveryFilter === 'Entregado' ? s.delivered : !s.delivered)
    const matchProgress = progressFilter === 'Progreso' || (progressFilter === 'Alto (>60%)' ? s.progress > 60 : s.progress <= 60)
    return matchSearch && matchDelivery && matchProgress
  })

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Page title */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Listado de Estudiantes</Text>
          <Text style={styles.pageSub}>Gestión de la cohorte activa. Supervisa el progreso individual y el cumplimiento de entregas académicas.</Text>
          <View style={styles.actionBtns}>
            <TouchableOpacity style={styles.exportBtn} activeOpacity={0.7} onPress={() => Alert.alert('Exportar', 'Generando CSV de estudiantes...')}>
              <Ionicons name="download-outline" size={14} color={colors.primary} />
              <Text style={styles.exportBtnText}>Exportar CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageBtn} activeOpacity={0.85}
              onPress={() => navigation.navigate('ProfessorAnnouncement')}>
              <Ionicons name="megaphone-outline" size={14} color={colors.white} />
              <Text style={styles.messageBtnText}>Comunicado Masivo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search + filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar por nombre, email o ID..."
              placeholderTextColor={colors.placeholder}
            />
          </View>
          <View style={styles.filtersRow}>
            <TouchableOpacity
              style={[styles.filterChip, deliveryIdx > 0 && styles.filterChipActive]}
              onPress={() => setDeliveryIdx((i) => (i + 1) % DELIVERY_OPTIONS.length)}
            >
              <Text style={[styles.filterChipText, deliveryIdx > 0 && styles.filterChipTextActive]}>{deliveryFilter}</Text>
              <Ionicons name="chevron-down" size={12} color={deliveryIdx > 0 ? colors.primary : colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, progressIdx > 0 && styles.filterChipActive]}
              onPress={() => setProgressIdx((i) => (i + 1) % PROGRESS_OPTIONS.length)}
            >
              <Text style={[styles.filterChipText, progressIdx > 0 && styles.filterChipTextActive]}>{progressFilter}</Text>
              <Ionicons name="chevron-down" size={12} color={progressIdx > 0 ? colors.primary : colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterIconBtn, (deliveryIdx > 0 || progressIdx > 0) && styles.filterIconBtnActive]}
              onPress={() => { setDeliveryIdx(0); setProgressIdx(0) }}
            >
              <Ionicons name="funnel-outline" size={16} color={(deliveryIdx > 0 || progressIdx > 0) ? colors.primary : colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Student table */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>ESTUDIANTE</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>PROG.</Text>
          </View>
          {filtered.map((student, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}
              onPress={() => navigation.navigate('ProfessorStudentDetail')}
              activeOpacity={0.7}
            >
              <View style={[styles.studentCell, { flex: 2 }]}>
                <View style={[styles.studentAvatar, { backgroundColor: student.color }]}>
                  <Text style={styles.studentAvatarText}>{student.initials}</Text>
                </View>
                <Text style={styles.studentName}>{student.name}</Text>
              </View>
              <View style={[styles.progressCell, { flex: 1 }]}>
                <View style={styles.miniProgressTrack}>
                  <View style={[styles.miniProgressFill, { width: `${student.progress}%` as any }]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pagination info */}
        <Text style={styles.paginationInfo}>Mostrando 1 a {filtered.length} de los estudiantes</Text>

        {/* Recent badges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insignias Recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfessorStudentDetail')}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgesRow}>
            {BADGES.map((badge, i) => (
              <View key={i} style={[styles.badge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.color }]}>{badge.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Next class */}
        <View style={styles.nextClassCard}>
          <Text style={styles.nextClassLabel}>PRÓXIMA CLASE</Text>
          <Text style={styles.nextClassTitle}>Arquitectura de Microservicios</Text>
          <TouchableOpacity style={styles.joinBtn} activeOpacity={0.85} onPress={() => Alert.alert('Clase en vivo', 'Iniciando sesión de clase...')}>
            <Text style={styles.joinBtnText}>Unirse ahora</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ProfessorAnnouncement')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>

      <ProfessorBottomNavBar activeTab="ProfessorStudentsList" navigation={navigation} />
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  pageSub: { fontSize: fontSize.caption, color: colors.textMuted, lineHeight: 18 },
  actionBtns: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  exportBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.primary },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  messageBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
  searchSection: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  filtersRow: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  filterChipText: { fontSize: fontSize.caption, color: colors.textMuted },
  filterChipTextActive: { color: colors.primary, fontWeight: '600' },
  filterIconBtn: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconBtnActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  tableSection: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  tableHeaderText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tableRowAlt: { backgroundColor: '#FAFCFB' },
  studentCell: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  studentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentAvatarText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.avatarText },
  studentName: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  progressCell: { alignItems: 'center' },
  miniProgressTrack: { width: '80%', height: 6, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  miniProgressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  paginationInfo: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    fontSize: fontSize.caption,
    color: colors.textMuted,
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
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.full },
  badgeText: { fontSize: fontSize.caption, fontWeight: '600' },
  nextClassCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  nextClassLabel: { fontSize: fontSize.caption, fontWeight: '700', color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 },
  nextClassTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.white },
  joinBtn: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  joinBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.primaryDark },
  fab: {
    position: 'absolute',
    bottom: 68,
    right: spacing.md,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
})
