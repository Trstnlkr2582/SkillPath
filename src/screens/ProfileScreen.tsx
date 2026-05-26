import React from 'react'
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
import BottomNavBar from '../components/BottomNavBar'
import { useAuth } from '../context/AuthContext'

const BADGES = [
  { label: 'SQL Master', color: colors.accentViolet, bg: colors.credentialBg },
  { label: 'Algorithms Pro', color: colors.activeText, bg: colors.activeBg },
]

const SETTINGS_ITEMS = [
  { icon: 'person-outline', label: 'Información Personal', sub: 'Nombre, email y foto de perfil', screen: null },
  { icon: 'shield-checkmark-outline', label: 'Seguridad y Acceso', sub: 'Contraseña y autenticación en dos pasos', screen: null },
  { icon: 'card-outline', label: 'Suscripción y Pago', sub: 'Gestiona tu plan Premium y facturación', screen: null },
]

const ACTIVITY_ITEMS = [
  { text: 'Completaste el módulo "Diseño de Patrones"', time: 'Hace 2 horas', icon: 'checkmark-circle-outline', color: colors.primary },
  { text: 'Nueva evaluación disponible en "React Avanzado"', time: 'Hace 5 horas', icon: 'document-text-outline', color: colors.accentAmber },
  { text: 'Recibiste una medalla por tu participación en foros', time: 'Ayer', icon: 'ribbon-outline', color: colors.accentViolet },
]

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth()
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'US'

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: () => logout() },
    ])
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.userName}>{user?.name ?? 'Usuario'}</Text>
            <View style={styles.specialistBadge}>
              <Text style={styles.specialistBadgeText}>ESPECIALISTA</Text>
            </View>
            <Text style={styles.heroSub}>en {user?.academic_profile?.career ?? 'Desarrollo de Software'}</Text>
            <View style={styles.specialistTag}>
              <Text style={styles.specialistTagText}>Premium</Text>
            </View>
          </View>
        </View>

        {/* Progress stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>78%</Text>
            <Text style={styles.statLabel}>PROGRESO GENERAL</Text>
            <Text style={styles.statSub}>Cuánto más para completar la ruta actual</Text>
          </View>
          <View style={styles.statsDividerH} />
          <View style={styles.bottomStats}>
            <View style={styles.bottomStatItem}>
              <Ionicons name="ribbon-outline" size={18} color={colors.accentViolet} />
              <Text style={[styles.bottomStatValue, { color: colors.accentViolet }]}>12</Text>
              <Text style={styles.bottomStatLabel}>CERTIFICACIONES</Text>
            </View>
            <View style={styles.statsDividerV} />
            <View style={styles.bottomStatItem}>
              <Ionicons name="flame-outline" size={18} color={colors.accentAmber} />
              <Text style={[styles.bottomStatValue, { color: colors.accentAmber }]}>11 Días</Text>
              <Text style={styles.bottomStatLabel}>RACHA DE ESTUDIO</Text>
            </View>
          </View>
        </View>

        {/* Recent badges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insignias Recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Credentials')}>
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
          <TouchableOpacity style={styles.joinBtn} activeOpacity={0.85}
            onPress={() => navigation.navigate('Lesson')}>
            <Text style={styles.joinBtnText}>Unirse ahora</Text>
          </TouchableOpacity>
        </View>

        {/* Account settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración de la Cuenta</Text>
          {SETTINGS_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.settingsItem, idx === SETTINGS_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
              activeOpacity={0.7}
            >
              <View style={styles.settingsIcon}>
                <Ionicons name={item.icon as any} size={18} color={colors.primary} />
              </View>
              <View style={styles.settingsInfo}>
                <Text style={styles.settingsLabel}>{item.label}</Text>
                <Text style={styles.settingsSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Activity summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Actividad</Text>
          {ACTIVITY_ITEMS.map((item, i) => (
            <View key={i} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon as any} size={16} color={item.color} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityText}>{item.text}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <BottomNavBar activeTab="Profile" navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
  heroSection: {
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: { fontSize: 22, fontWeight: '600', color: colors.avatarText },
  heroInfo: { flex: 1, gap: 4 },
  userName: { fontSize: fontSize.headingSm, fontWeight: '700', color: colors.white, marginBottom: 2 },
  specialistBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  specialistBadgeText: { fontSize: fontSize.caption, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  heroSub: { fontSize: fontSize.body, color: 'rgba(255,255,255,0.85)', fontWeight: '500' },
  specialistTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentAmber,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  specialistTagText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.white },
  statsCard: {
    marginHorizontal: spacing.md,
    marginTop: -spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: { gap: 2 },
  statValue: { fontSize: fontSize.headingLg, fontWeight: '700', color: colors.textPrimary },
  statLabel: { fontSize: fontSize.caption, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.4 },
  statSub: { fontSize: fontSize.caption, color: colors.textMuted },
  statsDividerH: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  bottomStats: { flexDirection: 'row' },
  bottomStatItem: { flex: 1, alignItems: 'center', gap: 2 },
  statsDividerV: { width: 1, backgroundColor: colors.border },
  bottomStatValue: { fontSize: fontSize.headingSm, fontWeight: '700', color: colors.textPrimary },
  bottomStatLabel: { fontSize: 9, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.3 },
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
  },
  joinBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.primaryDark },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsInfo: { flex: 1 },
  settingsLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  settingsSub: { fontSize: fontSize.caption, color: colors.textMuted },
  activityItem: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  activityInfo: { flex: 1 },
  activityText: { fontSize: fontSize.bodySm, color: colors.textPrimary, lineHeight: 20 },
  activityTime: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.errorBg,
    backgroundColor: colors.errorBg,
  },
  logoutText: { fontSize: fontSize.body, fontWeight: '600', color: colors.danger },
})
