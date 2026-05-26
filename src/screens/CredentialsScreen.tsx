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
import BottomNavBar from '../components/BottomNavBar'

const TABS = ['Todos (16)', 'Certificados', 'Insignias', 'Micro-credenciales']

const CREDENTIALS = [
  { id: '1', title: 'Clean Code Specialist', desc: 'Micro-credencial de calidad de software y buenas prácticas de desarrollo.', status: 'VERIFICADO', icon: 'code-slash-outline', iconBg: colors.credentialBg, iconColor: colors.accentViolet },
  { id: '2', title: 'Pensamiento Analítico', desc: 'Insignia por resolución de problemas complejos en el módulo de gestión.', status: 'LOGRADO', icon: 'bulb-outline', iconBg: colors.progressBg, iconColor: colors.accentAmber },
  { id: '3', title: 'Data Management Pro', desc: 'Certificación intermedia en administración de bases de datos relacionales.', status: 'VERIFICADO', icon: 'server-outline', iconBg: colors.credentialBg, iconColor: colors.accentViolet },
  { id: '4', title: 'Cloud Fundamentals', desc: 'Dominio de conceptos básicos de infraestructura en la nube y servicios serverless.', status: 'VERIFICADO', icon: 'cloud-outline', iconBg: colors.primaryLight, iconColor: colors.successText },
  { id: '5', title: 'Ciberseguridad I', desc: 'Protección de la seguridad y respuesta ante incidentes para redes empresariales.', status: 'ACCIÓN REQUERIDA', icon: 'shield-outline', iconBg: colors.errorBg, iconColor: colors.danger },
]

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  'VERIFICADO': { bg: colors.activeBg, text: colors.activeText },
  'LOGRADO': { bg: colors.credentialBg, text: colors.accentViolet },
  'ACCIÓN REQUERIDA': { bg: colors.errorBg, text: colors.danger },
}

export default function CredentialsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title section */}
        <View style={styles.titleSection}>
          <View style={styles.logrosTag}>
            <Text style={styles.logrosTagText}>Logros Académicos</Text>
          </View>
          <Text style={styles.pageTitle}>Mis Credenciales</Text>
          <Text style={styles.pageDesc}>
            Gestiona y comparte tus certificaciones oficiales, insignias de competencia y
            micro-credenciales obtenidas en tu trayectoria profesional.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Insignias</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>04</Text>
              <Text style={styles.statLabel}>Certificados</Text>
            </View>
          </View>
        </View>

        {/* Featured credential card */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredIconBox}>
            <Ionicons name="ribbon" size={28} color={colors.white} />
          </View>
          <Text style={styles.featuredLevel}>NIVEL EXPERTO</Text>
          <Text style={styles.featuredTitle}>Arquitectura de Sistemas Distribuidos</Text>
          <View style={styles.certBadge}>
            <Text style={styles.certBadgeText}>Certificación</Text>
          </View>
          <Text style={styles.featuredDesc}>
            Emitido el 15 de Octubre, 2023. Esta credencial valida conocimientos avanzados en microservicios, latencia y escalabilidad horizontal.
          </Text>
          <View style={styles.featuredActions}>
            <TouchableOpacity style={styles.featuredBtn} activeOpacity={0.8} onPress={() => Alert.alert('Descargar', 'Generando PDF de tu credencial...')}>
              <Ionicons name="download-outline" size={14} color={colors.white} />
              <Text style={styles.featuredBtnText}>Descargar PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredBtn} activeOpacity={0.8} onPress={() => Alert.alert('Compartir', 'Enlace copiado al portapapeles.')}>
              <Ionicons name="share-social-outline" size={14} color={colors.white} />
              <Text style={styles.featuredBtnText}>Compartir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Próxima Meta */}
        <View style={styles.metaCard}>
          <Text style={styles.metaTitle}>Próxima Meta</Text>
          <Text style={styles.metaDesc}>Estás a solo una evaluación de obtener tu insignia de "Liderazgo Técnico".</Text>
          <View style={styles.metaProgressRow}>
            <Text style={styles.metaProgressLabel}>Progreso</Text>
            <Text style={styles.metaProgressPct}>85%</Text>
          </View>
          <View style={styles.metaTrack}>
            <View style={[styles.metaFill, { width: '85%' }]} />
          </View>
          <TouchableOpacity style={styles.metaBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Roadmap')}>
            <Text style={styles.metaBtnText}>Continuar Evaluación</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
          {TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === i && styles.tabActive]}
              onPress={() => setActiveTab(i)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Credential list */}
        <View style={styles.credList}>
          {CREDENTIALS.map((cred) => {
            const s = STATUS_STYLE[cred.status] ?? STATUS_STYLE['VERIFICADO']
            return (
              <TouchableOpacity key={cred.id} style={styles.credCard} activeOpacity={0.8} onPress={() => Alert.alert(cred.title, cred.desc)}>
                <View style={[styles.credIcon, { backgroundColor: cred.iconBg }]}>
                  <Ionicons name={cred.icon as any} size={20} color={cred.iconColor} />
                </View>
                <View style={styles.credInfo}>
                  <Text style={styles.credTitle}>{cred.title}</Text>
                  <Text style={styles.credDesc} numberOfLines={2}>{cred.desc}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
                    <Text style={[styles.statusText, { color: s.text }]}>{cred.status}</Text>
                  </View>
                </View>
                <Ionicons name="open-outline" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Obtener nueva */}
        <TouchableOpacity style={styles.newBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Catalog')}>
          <Ionicons name="add" size={18} color={colors.textMuted} />
          <Text style={styles.newBtnText}>Obtener Nueva</Text>
        </TouchableOpacity>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <BottomNavBar activeTab="Credentials" navigation={navigation} />
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
  titleSection: { padding: spacing.md, backgroundColor: colors.white, gap: 8 },
  logrosTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.activeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  logrosTagText: { fontSize: 12, fontWeight: '500', color: colors.successText },
  pageTitle: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  pageDesc: { fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: 4 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textMuted },
  statDivider: { width: 1, height: 40, backgroundColor: colors.border },
  featuredCard: {
    margin: spacing.md,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.xl,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  featuredIconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredLevel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.6)', letterSpacing: 1 },
  featuredTitle: { fontSize: 18, fontWeight: '700', color: colors.white, textAlign: 'center' },
  certBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  certBadgeText: { fontSize: 12, fontWeight: '500', color: colors.white },
  featuredDesc: { fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 18 },
  featuredActions: { flexDirection: 'row', gap: 10, marginTop: 4, width: '100%' },
  featuredBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.md,
    paddingVertical: 10,
  },
  featuredBtnText: { fontSize: 13, fontWeight: '500', color: colors.white },
  metaCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.progressBg,
    borderRadius: radius.xl,
    padding: spacing.md,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.accentAmber + '30',
  },
  metaTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.progressText },
  metaDesc: { fontSize: fontSize.bodySm, color: colors.textPrimary, lineHeight: 20 },
  metaProgressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaProgressLabel: { fontSize: 12, color: colors.textMuted },
  metaProgressPct: { fontSize: 12, fontWeight: '600', color: colors.progressText },
  metaTrack: { height: 6, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  metaFill: { height: '100%', backgroundColor: colors.accentAmber, borderRadius: 4 },
  metaBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  metaBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  tabsScroll: { borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.white, maxHeight: 48 },
  tabsContent: { paddingHorizontal: spacing.md, flexDirection: 'row', gap: 4 },
  tab: { paddingHorizontal: 14, paddingVertical: 12 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText: { fontSize: 13, color: colors.textMuted, fontWeight: '400' },
  tabTextActive: { color: colors.primary, fontWeight: '600' },
  credList: { padding: spacing.md, gap: 10 },
  credCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 12,
  },
  credIcon: { width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  credInfo: { flex: 1, gap: 4 },
  credTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  credDesc: { fontSize: 12, color: colors.textMuted, lineHeight: 17 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '600' },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    height: 52,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  newBtnText: { fontSize: fontSize.body, color: colors.textMuted, fontWeight: '500' },
})
