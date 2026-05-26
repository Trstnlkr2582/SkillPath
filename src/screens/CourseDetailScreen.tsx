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

const LEARNINGS = [
  'Principios de escalabilidad horizontal y vertical',
  'Diseño de microservicios con comunicación asíncrona',
  'Gestión de estado distribuido y consistencia eventual',
  'Estrategias de caching y optimización de consultas',
]

const MODULES = [
  { id: 1, title: 'Introducción a la arquitectura escalable', lessons: 4, duration: '2h 30m', expanded: true },
  { id: 2, title: 'Microservicios: diseño y comunicación', lessons: 6, duration: '4h', expanded: false },
  { id: 3, title: 'Bases de datos distribuidas', lessons: 5, duration: '3h 30m', expanded: false },
  { id: 4, title: 'Monitoreo y observabilidad', lessons: 4, duration: '3h', expanded: false },
]

export default function CourseDetailScreen({ navigation }: any) {
  const [expandedModule, setExpandedModule] = useState<number | null>(1)

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      {/* Video Hero */}
      <View style={styles.videoHero}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.playBtn}>
          <Ionicons name="play-circle" size={52} color={colors.white} />
        </View>
        <Text style={styles.videoLabel}>Vista previa del curso</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Course header */}
        <View style={styles.courseHeader}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>Tecnología</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color={colors.accentAmber} />
              <Text style={styles.ratingText}>4.8 · 324 estudiantes</Text>
            </View>
          </View>
          <Text style={styles.courseTitle}>Arquitectura de Sistemas Escalables</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>14h en total</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="layers-outline" size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>19 lecciones</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="ribbon-outline" size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>Certificado</Text>
            </View>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Roadmap')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Ver hoja de ruta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate('Lesson')}
            activeOpacity={0.8}
          >
            <Ionicons name="play-outline" size={16} color={colors.primary} />
            <Text style={styles.secondaryBtnText}>Comenzar</Text>
          </TouchableOpacity>
        </View>

        {/* What you'll learn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lo que aprenderás</Text>
          <View style={styles.learningGrid}>
            {LEARNINGS.map((item, idx) => (
              <View key={idx} style={styles.learningItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.successText} />
                <Text style={styles.learningText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Course content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contenido del curso</Text>
          <View style={styles.accordionList}>
            {MODULES.map((mod) => (
              <View key={mod.id} style={styles.accordionItem}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.accordionLeft}>
                    <Text style={styles.moduleNum}>Módulo {mod.id}</Text>
                    <Text style={styles.moduleTitle}>{mod.title}</Text>
                  </View>
                  <Ionicons
                    name={expandedModule === mod.id ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
                {expandedModule === mod.id && (
                  <View style={styles.accordionBody}>
                    <View style={styles.accordionMeta}>
                      <Text style={styles.accordionMetaText}>{mod.lessons} lecciones · {mod.duration}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.startModuleBtn}
                      onPress={() => navigation.navigate('Lesson')}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="play-outline" size={14} color={colors.primary} />
                      <Text style={styles.startModuleText}>Iniciar módulo</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  videoHero: {
    backgroundColor: colors.primaryDark,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  backBtn: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    padding: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: radius.full,
  },
  playBtn: { opacity: 0.9 },
  videoLabel: { fontSize: fontSize.bodySm, color: 'rgba(255,255,255,0.65)' },
  scroll: { flex: 1 },
  courseHeader: {
    backgroundColor: colors.white,
    padding: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryText: { fontSize: fontSize.caption, fontWeight: '500', color: colors.successText },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  courseTitle: { fontSize: fontSize.headingLg, fontWeight: '600', color: colors.textPrimary, lineHeight: 30 },
  metaRow: { flexDirection: 'row', gap: spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  actionRow: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: colors.white, fontSize: fontSize.body, fontWeight: '600' },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: radius.md,
    height: 44,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  secondaryBtnText: { color: colors.primary, fontSize: fontSize.body, fontWeight: '500' },
  section: { padding: spacing.md, gap: spacing.sm },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  learningGrid: { gap: spacing.sm },
  learningItem: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  learningText: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary, lineHeight: 22 },
  accordionList: { gap: spacing.xs },
  accordionItem: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  accordionLeft: { flex: 1, gap: 2 },
  moduleNum: { fontSize: fontSize.caption, fontWeight: '500', color: colors.textMuted },
  moduleTitle: { fontSize: fontSize.headingSm, fontWeight: '500', color: colors.textPrimary },
  accordionBody: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },
  accordionMeta: {},
  accordionMetaText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  startModuleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
  },
  startModuleText: { fontSize: fontSize.bodySm, color: colors.primary, fontWeight: '500' },
})
