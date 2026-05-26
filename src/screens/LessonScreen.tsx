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

const KEY_POINTS = [
  'Jerarquías visuales y estructurales',
  'Sistemas de navegación y búsqueda',
  'Taxonomías y metadatos',
]

const RESOURCES = [
  { name: 'Guía de IA.pdf', size: '4.2 MB', type: 'PDF Document', icon: 'document-text-outline', iconColor: colors.danger, iconBg: colors.errorBg },
  { name: 'Template_Estructura.fig', size: '12.5 MB', type: 'Figma File', icon: 'layers-outline', iconColor: colors.accentViolet, iconBg: colors.credentialBg },
  { name: 'Matriz_de_Contenido_Prototipo.csv', size: '856 KB', type: 'Spreadsheet', icon: 'grid-outline', iconColor: colors.successText, iconBg: colors.activeBg },
]

export default function LessonScreen({ navigation }: any) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <Text style={styles.lessonLabel}>LECCIÓN 4 DE 12</Text>
          <Text style={styles.pctLabel}>75% completado</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
      </View>

      {/* Video */}
      <TouchableOpacity
        style={styles.videoPlayer}
        onPress={() => setIsPlaying(!isPlaying)}
        activeOpacity={1}
      >
        <View style={styles.playCircle}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color={colors.white} />
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Content */}
        <View style={styles.contentSection}>
          <Text style={styles.lessonTitle}>Arquitectura de Información</Text>
          <Text style={styles.lessonDesc}>
            En esta lección, exploraremos cómo organizar, estructurar y etiquetar el contenido de manera efectiva y sostenible. La arquitectura de información (IA) es fundamental para ayudar a los usuarios a encontrar información y completar tareas con el mínimo esfuerzo cognitivo.
          </Text>
          <Text style={styles.keyPointsLabel}>PUNTOS CLAVE:</Text>
          {KEY_POINTS.map((point, i) => (
            <View key={i} style={styles.keyPoint}>
              <Ionicons name="checkmark-circle-outline" size={16} color={colors.successText} />
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* Resources */}
        <View style={styles.resourcesSection}>
          <View style={styles.resourcesHeader}>
            <Ionicons name="folder-outline" size={16} color={colors.textMuted} />
            <Text style={styles.resourcesTitle}>Recursos descargables</Text>
          </View>
          {RESOURCES.map((res, i) => (
            <View key={i} style={styles.resourceCard}>
              <View style={[styles.resourceIcon, { backgroundColor: res.iconBg }]}>
                <Ionicons name={res.icon as any} size={18} color={res.iconColor} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName} numberOfLines={1}>{res.name}</Text>
                <Text style={styles.resourceMeta}>{res.size} · {res.type}</Text>
              </View>
              <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.7} onPress={() => Alert.alert('Descarga', `Descargando ${res.name}...`)}>
                <Ionicons name="download-outline" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Navigation buttons */}
        <View style={styles.navSection}>
          <TouchableOpacity
            style={styles.prevBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={16} color={colors.primary} />
            <Text style={styles.prevBtnText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => navigation.navigate('Submission')}
            activeOpacity={0.85}
          >
            <Text style={styles.nextBtnText}>Siguiente lección</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </TouchableOpacity>
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
  progressSection: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lessonLabel: { fontSize: 12, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.5 },
  pctLabel: { fontSize: 12, fontWeight: '500', color: colors.successText },
  progressTrack: { height: 4, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  videoPlayer: {
    height: 220,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  contentSection: {
    backgroundColor: colors.white,
    padding: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lessonTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  lessonDesc: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22 },
  keyPointsLabel: { fontSize: 12, fontWeight: '700', color: colors.textPrimary, letterSpacing: 0.5, marginTop: 4 },
  keyPoint: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  keyPointText: { fontSize: fontSize.body, color: colors.textPrimary, flex: 1 },
  resourcesSection: { padding: spacing.md, gap: 10 },
  resourcesHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  resourcesTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 10,
  },
  resourceIcon: { width: 40, height: 40, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  resourceInfo: { flex: 1 },
  resourceName: { fontSize: 13, fontWeight: '500', color: colors.textPrimary },
  resourceMeta: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  downloadBtn: { padding: spacing.xs },
  navSection: { padding: spacing.md, gap: 10 },
  prevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  prevBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.primary },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  nextBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
})
