import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import AdminBottomNavBar from '../components/AdminBottomNavBar'

type FilterType = 'Todos' | 'Estudiantes' | 'Profesores'

const USERS = [
  { name: 'Ana Martínez', email: 'ana.martinez@skillpat', role: 'Estudiante', initials: 'AM' },
  { name: 'Carlos Ruiz', email: 'c.ruiz@skillpath.edu', role: 'Profesor', initials: 'CR' },
  { name: 'Elena Soler', email: 'elena.soler@skillpath.', role: 'Estudiante', initials: 'ES' },
  { name: 'Roberto Gómez', email: 'r.gomez@skillpath.edu', role: 'Estudiante', initials: 'RG' },
]

export default function AdminUsersScreen({ navigation }: any) {
  const [filter, setFilter] = useState<FilterType>('Todos')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = USERS.filter((u) => {
    if (filter === 'Estudiantes') return u.role === 'Estudiante'
    if (filter === 'Profesores') return u.role === 'Profesor'
    return true
  }).filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Page title */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.pageTitle}>Gestión de Usuarios</Text>
            <Text style={styles.pageSub}>Administra los roles y el acceso de la comunidad educativa</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <Ionicons name="person-add-outline" size={14} color={colors.white} />
            <Text style={styles.addBtnText}>Añadir Usuario</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,284</Text>
            <Text style={styles.statLabel}>Total usuarios</Text>
            <View style={styles.statDelta}>
              <Text style={styles.statDeltaText}>+21% este mes</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>856</Text>
            <Text style={styles.statLabel}>Usuarios activos</Text>
            <Text style={styles.statSub}>67% de la base total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Nuevos (hoy)</Text>
            <Text style={[styles.statSub, { color: colors.primary }]}>Récord diario</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar por nombre o correo..."
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>

        {/* Filter tabs */}
        <View style={styles.filterTabs}>
          {(['Todos', 'Estudiantes', 'Profesores'] as FilterType[]).map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, filter === f && styles.filterTabActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* User table */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Usuario</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Correo</Text>
          </View>
          {filtered.map((user, i) => (
            <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
              <View style={[styles.userCell, { flex: 2 }]}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>{user.initials}</Text>
                </View>
                <View>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={[
                    styles.userRole,
                    user.role === 'Profesor' && styles.userRoleProf,
                  ]}>{user.role}</Text>
                </View>
              </View>
              <Text style={[styles.userEmail, { flex: 2 }]} numberOfLines={1}>{user.email}</Text>
            </View>
          ))}
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <Text style={styles.paginationInfo}>
            Mostrando 1 a {filtered.length} de 1,284 usuarios
          </Text>
          <View style={styles.paginationBtns}>
            <TouchableOpacity
              style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}
              disabled={page === 1}
              onPress={() => setPage(p => Math.max(1, p - 1))}
            >
              <Ionicons name="chevron-back" size={14} color={page === 1 ? colors.border : colors.textMuted} />
            </TouchableOpacity>
            {[1, 2, 3].map((n) => (
              <TouchableOpacity
                key={n}
                style={[styles.pageBtn, page === n && styles.pageBtnActive]}
                onPress={() => setPage(n)}
              >
                <Text style={[styles.pageBtnText, page === n && styles.pageBtnTextActive]}>{n}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.pageBtn} onPress={() => setPage(p => p + 1)}>
              <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>

      <AdminBottomNavBar activeTab="AdminUsers" navigation={navigation} />
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  addBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
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
  },
  statValue: { fontSize: fontSize.headingMd, fontWeight: '700', color: colors.textPrimary },
  statLabel: { fontSize: fontSize.caption, color: colors.textMuted },
  statDelta: {
    backgroundColor: colors.activeBg,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  statDeltaText: { fontSize: 9, fontWeight: '600', color: colors.activeText },
  statSub: { fontSize: fontSize.caption, color: colors.textMuted },
  searchSection: { paddingHorizontal: spacing.md, marginTop: spacing.md },
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
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  filterTabText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textMuted },
  filterTabTextActive: { color: colors.primary },
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
  tableHeaderCell: { fontSize: fontSize.caption, fontWeight: '600', color: colors.textMuted },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableRowAlt: { backgroundColor: '#FAFCFB' },
  userCell: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.avatarText },
  userName: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  userRole: { fontSize: fontSize.caption, color: colors.primary },
  userRoleProf: { color: colors.accentViolet },
  userEmail: { fontSize: fontSize.caption, color: colors.textMuted },
  pagination: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  paginationInfo: { fontSize: fontSize.caption, color: colors.textMuted },
  paginationBtns: { flexDirection: 'row', gap: spacing.xs },
  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pageBtnDisabled: { borderColor: colors.surface },
  pageBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  pageBtnText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textMuted },
  pageBtnTextActive: { color: colors.white },
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
