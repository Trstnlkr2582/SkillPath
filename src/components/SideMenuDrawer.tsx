import React from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import { useAuth } from '../context/AuthContext'

interface Props {
  visible: boolean
  onClose: () => void
  navigation: any
}

type NavItem = { label: string; icon: string; screen: string }

const STUDENT_ITEMS: NavItem[] = [
  { label: 'Inicio', icon: 'home-outline', screen: 'Dashboard' },
  { label: 'Cursos', icon: 'book-outline', screen: 'Catalog' },
  { label: 'Mi Progreso', icon: 'trending-up-outline', screen: 'Credentials' },
  { label: 'Tareas', icon: 'clipboard-outline', screen: 'Submission' },
  { label: 'Perfil', icon: 'person-outline', screen: 'Profile' },
]

const PROFESSOR_ITEMS: NavItem[] = [
  { label: 'Inicio', icon: 'home-outline', screen: 'ProfessorDashboard' },
  { label: 'Estudiantes', icon: 'people-outline', screen: 'ProfessorStudentsList' },
  { label: 'Mensajes', icon: 'chatbubble-outline', screen: 'ProfessorAnnouncement' },
  { label: 'Perfil', icon: 'person-outline', screen: 'Profile' },
]

const ADMIN_ITEMS: NavItem[] = [
  { label: 'Inicio', icon: 'home-outline', screen: 'AdminDashboard' },
  { label: 'Cursos', icon: 'book-outline', screen: 'AdminCourses' },
  { label: 'Reportes', icon: 'bar-chart-outline', screen: 'AdminReports' },
  { label: 'Usuarios', icon: 'people-outline', screen: 'AdminUsers' },
  { label: 'Perfil', icon: 'person-outline', screen: 'Profile' },
]

export default function SideMenuDrawer({ visible, onClose, navigation }: Props) {
  const { user, role, logout } = useAuth()
  const { top, bottom } = useSafeAreaInsets()

  const initials = user?.name
    ? user.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'US'

  const items =
    role === 'professor' ? PROFESSOR_ITEMS :
    role === 'admin' ? ADMIN_ITEMS :
    STUDENT_ITEMS

  const roleLabel =
    role === 'professor' ? 'Profesor' :
    role === 'admin' ? 'Administrador' :
    'Estudiante'

  const handleNav = (screen: string) => {
    onClose()
    setTimeout(() => navigation.navigate(screen), 150)
  }

  const handleLogout = () => {
    onClose()
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => logout() },
      ]
    )
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={[styles.drawer, { paddingTop: top + spacing.sm, paddingBottom: bottom + spacing.md }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerBrand}>SkillPath</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.userSection}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{initials}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName} numberOfLines={1}>{user?.name ?? 'Usuario'}</Text>
              <Text style={styles.userRole}>{roleLabel}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.navItems}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={styles.navItem}
                onPress={() => handleNav(item.screen)}
                activeOpacity={0.7}
              >
                <View style={styles.navIconBox}>
                  <Ionicons name={item.icon as any} size={20} color={colors.primary} />
                </View>
                <Text style={styles.navLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.border} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flex: 1 }} />
          <View style={styles.divider} />

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={20} color={colors.danger} />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  drawer: {
    width: '72%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing.md,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  drawerBrand: { fontSize: 18, fontWeight: '700', color: colors.primary },
  closeBtn: { padding: spacing.xs },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.sm,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userAvatarText: { fontSize: 15, fontWeight: '700', color: colors.white },
  userInfo: { flex: 1 },
  userName: { fontSize: fontSize.body, fontWeight: '600', color: colors.textPrimary },
  userRole: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 1 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  navItems: { gap: 2 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 12,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
  },
  navIconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: { flex: 1, fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  logoutText: { fontSize: fontSize.body, fontWeight: '500', color: colors.danger },
})
