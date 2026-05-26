import React, { useState } from 'react'
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

const KEY_POINTS = [
  'La arquitectura de información define cómo se organiza, estructura y etiqueta el contenido.',
  'Los sistemas de navegación determinan cómo los usuarios se mueven por el producto.',
  'Los esquemas de organización jerárquicos son los más comunes en aplicaciones móviles.',
]

export default function LessonScreen({ navigation }: any) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={20} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.progressInfo}>
          <Text style={styles.progressLabel}>Lección 3 de 8</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '37%' }]} />
          </View>
        </View>
        <Text style={styles.progressPct}>37%</Text>
      </View>

      {/* Video Player */}
      <View style={styles.videoPlayer}>
        {/* Thumbnail placeholder */}
        <View style={styles.thumbnail}>
          <Ionicons name="play-circle-outline" size={60} color="rgba(255,255,255,0.6)" />
        </View>
        {/* Controls overlay */}
        <TouchableOpacity
          style={styles.controlsOverlay}
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={1}
        >
          <View style={styles.playPauseBtn}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color={colors.white} />
          </View>
          <View style={styles.videoControls}>
            <Text style={styles.timeLabel}>03:24 / 12:50</Text>
            <View style={styles.controlBtns}>
              <TouchableOpacity>
                <Ionicons name="play-skip-back-outline" size={18} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="play-skip-forward-outline" size={18} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="expand-outline" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Lesson content */}
        <View style={styles.contentSection}>
          <Text style={styles.lessonTitle}>Arquitectura de Información</Text>

          <View style={styles.keyPointsSection}>
            <Text style={styles.keyPointsLabel}>PUNTOS CLAVE:</Text>
            {KEY_POINTS.map((point, idx) => (
              <View key={idx} style={styles.keyPoint}>
                <View style={styles.keyPointDot}>
                  <Ionicons name="checkmark" size={10} color={colors.white} />
                </View>
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.resourcesTitle}>Recursos de la lección</Text>
          <TouchableOpacity style={styles.resourceCard} activeOpacity={0.8}>
            <View style={styles.resourceIcon}>
              <Ionicons name="document-text-outline" size={20} color={colors.danger} />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>Guía de Arquitectura de Información.pdf</Text>
              <Text style={styles.resourceSize}>2.4 MB · PDF</Text>
            </View>
            <Ionicons name="cloud-download-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View style={styles.navSection}>
          <TouchableOpacity style={styles.navBtn} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={16} color={colors.primary} />
            <Text style={styles.navBtnText}>Lección anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnPrimary]}
            onPress={() => navigation.navigate('Submission')}
            activeOpacity={0.85}
          >
            <Text style={styles.navBtnPrimaryText}>Siguiente lección</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: spacing.xs },
  progressInfo: { flex: 1, gap: 4 },
  progressLabel: { fontSize: fontSize.caption, color: 'rgba(255,255,255,0.65)' },
  progressTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  progressPct: { fontSize: fontSize.caption, fontWeight: '500', color: 'rgba(255,255,255,0.8)', width: 28 },
  videoPlayer: {
    backgroundColor: '#0D0D0D',
    height: 220,
    position: 'relative',
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  timeLabel: { fontSize: fontSize.caption, color: colors.white },
  controlBtns: { flexDirection: 'row', gap: spacing.md },
  scroll: { flex: 1 },
  contentSection: {
    backgroundColor: colors.white,
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lessonTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  keyPointsSection: { gap: spacing.sm },
  keyPointsLabel: {
    fontSize: fontSize.label,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  keyPoint: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  keyPointDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  keyPointText: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary, lineHeight: 22 },
  resourcesSection: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  resourcesTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.errorBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: { flex: 1 },
  resourceName: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  resourceSize: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  navSection: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  navBtnText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.primary },
  navBtnPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  navBtnPrimaryText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
})
