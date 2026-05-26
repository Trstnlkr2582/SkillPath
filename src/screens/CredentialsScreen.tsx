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

const CREDENTIALS = [
  {
    id: '1',
    title: 'Diseño de Interfaces Avanzado',
    institution: 'Universidad de La Sabana',
    date: 'Abr 2025',
    status: 'verified' as const,
  },
  {
    id: '2',
    title: 'Fundamentos de Sistemas Distribuidos',
    institution: 'Universidad de La Sabana',
    date: 'Feb 2025',
    status: 'verified' as const,
  },
  {
    id: '3',
    title: 'Estrategia de Producto Digital',
    institution: 'Universidad de La Sabana',
    date: 'En curso',
    status: 'in_progress' as const,
  },
  {
    id: '4',
    title: 'Machine Learning Aplicado',
    institution: 'Universidad de La Sabana',
    date: 'May 2024',
    status: 'expired' as const,
  },
]

const statusConfig = {
  verified: { bg: colors.activeBg, text: colors.activeText, label: 'Verificado' },
  in_progress: { bg: colors.progressBg, text: colors.progressText, label: 'En curso' },
  expired: { bg: colors.errorBg, text: colors.errorText, label: 'Vencido' },
}

export default function CredentialsScreen({ navigation }: any) {
  const [apiCredentials, setApiCredentials] = React.useState<any[]>([])
  const [loadingApi, setLoadingApi] = React.useState(true)

  React.useEffect(() => {
    import('../services/credentials.service').then(({ credentialsService }) => {
      credentialsService.getMine()
        .then(setApiCredentials)
        .finally(() => setLoadingApi(false))
    })
  }, [])

  const source = apiCredentials.length > 0 ? apiCredentials : CREDENTIALS

  const verified = source.filter((c: any) => c.status === 'verified' || c.status === 'active').length
  const inProgress = source.filter((c: any) => c.status === 'in_progress').length

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primaryDark} />

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Mis Credenciales</Text>
        <Text style={styles.heroSub}>
          Gestiona y comparte tus certificaciones oficiales, insignias de competencia y
          micro-credenciales obtenidas en tu trayectoria.
        </Text>
        {/* Summary stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{verified}</Text>
            <Text style={styles.statLabel}>Verificadas</Text>
          </View>
          <View style={[styles.statCard, styles.statDivider]}>
            <Text style={styles.statValue}>{inProgress}</Text>
            <Text style={styles.statLabel}>En curso</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{CREDENTIALS.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Featured certificate */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Logro destacado</Text>
        </View>
        <View style={styles.featuredCard}>
          <View style={styles.featuredIcon}>
            <Ionicons name="ribbon" size={28} color={colors.white} />
          </View>
          <View style={styles.featuredInfo}>
            <Text style={styles.featuredTitle}>Diseño de Interfaces Avanzado</Text>
            <Text style={styles.featuredInstitution}>Universidad de La Sabana</Text>
            <Text style={styles.featuredDate}>Emitida: Abril 2025</Text>
            <View style={styles.featuredBadge}>
              <Ionicons name="checkmark-circle" size={12} color={colors.activeText} />
              <Text style={styles.featuredBadgeText}>Verificado</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* All credentials */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Todas las credenciales</Text>
          <Text style={styles.sectionCount}>{CREDENTIALS.length}</Text>
        </View>

        <View style={styles.credentialList}>
          {CREDENTIALS.map((cred) => {
            const config = statusConfig[cred.status]
            return (
              <TouchableOpacity key={cred.id} style={styles.credCard} activeOpacity={0.8}>
                <View style={[styles.credIcon, { backgroundColor: colors.credentialBg }]}>
                  <Ionicons name="ribbon-outline" size={18} color={colors.accentViolet} />
                </View>
                <View style={styles.credInfo}>
                  <Text style={styles.credTitle} numberOfLines={2}>{cred.title}</Text>
                  <Text style={styles.credInstitution}>{cred.institution}</Text>
                  <View style={styles.credBottom}>
                    <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
                      <Text style={[styles.statusBadgeText, { color: config.text }]}>{config.label}</Text>
                    </View>
                    <Text style={styles.credDate}>{cred.date}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <BottomNavBar activeTab="Credentials" navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  hero: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  heroTitle: { fontSize: fontSize.headingXl, fontWeight: '600', color: colors.white },
  heroSub: { fontSize: fontSize.body, color: 'rgba(255,255,255,0.65)', lineHeight: 22 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.lg,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  statDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: { fontSize: fontSize.headingLg, fontWeight: '600', color: colors.white },
  statLabel: { fontSize: fontSize.caption, color: 'rgba(255,255,255,0.6)' },
  scroll: { flex: 1 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  sectionCount: {
    fontSize: fontSize.bodySm,
    color: colors.white,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featuredIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredInfo: { flex: 1, gap: 4 },
  featuredTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  featuredInstitution: { fontSize: fontSize.bodySm, color: colors.textMuted },
  featuredDate: { fontSize: fontSize.caption, color: colors.textMuted },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.activeBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginTop: 4,
  },
  featuredBadgeText: { fontSize: fontSize.caption, fontWeight: '500', color: colors.activeText },
  shareBtn: { padding: spacing.xs },
  credentialList: { paddingHorizontal: spacing.md, gap: spacing.sm },
  credCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  credIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  credInfo: { flex: 1, gap: 4 },
  credTitle: { fontSize: fontSize.headingSm, fontWeight: '500', color: colors.textPrimary, lineHeight: 20 },
  credInstitution: { fontSize: fontSize.caption, color: colors.textMuted },
  credBottom: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  statusBadgeText: { fontSize: fontSize.caption, fontWeight: '500' },
  credDate: { fontSize: fontSize.caption, color: colors.textMuted },
})
