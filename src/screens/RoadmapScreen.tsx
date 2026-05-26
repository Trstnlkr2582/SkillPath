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
import BottomNavBar from '../components/BottomNavBar'

const MODULES = [
  {
    id: 1,
    title: 'Principios Visuales',
    desc: 'Repaso de teoría del color, tipografía y jerarquía visual aplicada a interfaces modernas.',
    status: 'completed' as const,
    actionLabel: 'Ver Resumen',
    next: null,
  },
  {
    id: 2,
    title: 'Layouts y Grillas',
    desc: 'Estructuras complejas, responsive design avanzado y uso de grillas dinámicas en sistemas de diseño.',
    status: 'active' as const,
    actionLabel: 'Continuar Lección',
    next: 'Masonry Layouts',
  },
  {
    id: 3,
    title: 'Atomic Design',
    desc: 'Creación de sistemas escalables mediante átomos, moléculas y organismos reutilizables.',
    status: 'locked' as const,
    actionLabel: null,
    next: null,
  },
]

const STATUS = {
  completed: { icon: 'checkmark-circle' as const, iconColor: colors.successText, iconBg: colors.activeBg, label: 'Completado', labelBg: colors.activeBg, labelText: colors.activeText },
  active: { icon: 'pencil-outline' as const, iconColor: colors.primary, iconBg: colors.primaryLight, label: 'En curso', labelBg: colors.primaryLight, labelText: colors.primary },
  locked: { icon: 'lock-closed-outline' as const, iconColor: colors.textMuted, iconBg: colors.surface, label: 'Bloqueado', labelBg: colors.surface, labelText: colors.textMuted },
}

export default function RoadmapScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Breadcrumb + course info */}
        <View style={styles.courseSection}>
          <Text style={styles.breadcrumb}>Mis Cursos › Uú/UI Design</Text>
          <Text style={styles.courseTitle}>Diseño de Interfaces Avanzado</Text>
          <Text style={styles.courseDesc}>
            Domina los principios avanzados de interacción y diseño de sistemas complejos para productos digitales de alto impacto.
          </Text>
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressLabel}>65% Completado</Text>
          </View>
        </View>

        {/* Module list */}
        <View style={styles.moduleList}>
          {MODULES.map((mod) => {
            const s = STATUS[mod.status]
            return (
              <View key={mod.id} style={styles.moduleWrapper}>
                {/* Left icon column */}
                <View style={styles.iconCol}>
                  <View style={[styles.moduleIcon, { backgroundColor: s.iconBg }]}>
                    <Ionicons name={s.icon} size={20} color={s.iconColor} />
                  </View>
                  {mod.id < MODULES.length && <View style={styles.connector} />}
                </View>

                {/* Card */}
                <View style={[styles.moduleCard, mod.status === 'active' && styles.moduleCardActive]}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.moduleName}>{mod.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: s.labelBg }]}>
                      <Text style={[styles.statusText, { color: s.labelText }]}>{s.label}</Text>
                    </View>
                  </View>
                  <Text style={styles.moduleDesc}>{mod.desc}</Text>

                  {mod.status === 'completed' && (
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.summaryLink}>↺ Ver Resumen</Text>
                    </TouchableOpacity>
                  )}

                  {mod.status === 'active' && (
                    <View style={styles.activeActions}>
                      <TouchableOpacity
                        style={styles.continueBtn}
                        onPress={() => navigation.navigate('Lesson')}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.continueBtnText}>Continuar Lección →</Text>
                      </TouchableOpacity>
                      {mod.next && (
                        <Text style={styles.nextLabel}>Próxima: {mod.next}</Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
            )
          })}

          {/* Certification final card */}
          <View style={styles.certCard}>
            <View style={styles.certCardLeft}>
              <Ionicons name="trophy-outline" size={22} color={colors.accentAmber} />
            </View>
            <View style={styles.certCardBody}>
              <Text style={styles.certTitle}>Certificación Final</Text>
              <Text style={styles.certDesc}>
                Completa todos los módulos para obtener tu certificado oficial y compartirlo en tu red profesional.
              </Text>
              <View style={styles.certAvatars}>
                <View style={styles.certAvatarStack}>
                  {[0, 1, 2].map((i) => (
                    <View key={i} style={[styles.miniAvatar, { marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i }]}>
                      <Text style={styles.miniAvatarText}>{String.fromCharCode(65 + i)}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.certAvatarLabel}>+12k Estudiantes ya certificados</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <BottomNavBar activeTab="Catalog" navigation={navigation} />
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
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.avatarBg, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '600', color: colors.avatarText },
  scroll: { flex: 1 },
  courseSection: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  breadcrumb: { fontSize: 12, color: colors.textMuted },
  courseTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  courseDesc: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressTrack: { flex: 1, height: 6, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  progressLabel: { fontSize: 12, fontWeight: '500', color: colors.successText },
  moduleList: { padding: spacing.md, gap: 0 },
  moduleWrapper: { flexDirection: 'row', gap: 12, marginBottom: 0 },
  iconCol: { alignItems: 'center', width: 40 },
  moduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  connector: { width: 2, flex: 1, minHeight: 24, backgroundColor: colors.border, marginVertical: 4 },
  moduleCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: 12,
    gap: 8,
  },
  moduleCardActive: { borderColor: colors.primary, borderWidth: 1.5 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  moduleName: { flex: 1, fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '500' },
  moduleDesc: { fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
  summaryLink: { fontSize: 13, color: colors.primary, fontWeight: '500' },
  activeActions: { gap: 8 },
  continueBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  continueBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
  nextLabel: { fontSize: 12, color: colors.textMuted },
  certCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.progressBg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.accentAmber,
    padding: spacing.md,
    marginTop: 4,
  },
  certCardLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3D6',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  certCardBody: { flex: 1, gap: 6 },
  certTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  certDesc: { fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
  certAvatars: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  certAvatarStack: { flexDirection: 'row' },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  miniAvatarText: { fontSize: 9, fontWeight: '700', color: colors.avatarText },
  certAvatarLabel: { fontSize: 11, color: colors.textMuted },
})
