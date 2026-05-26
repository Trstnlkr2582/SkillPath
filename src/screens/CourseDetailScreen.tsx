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
import BottomNavBar from '../components/BottomNavBar'

const LEARNINGS = [
  'Diseñar arquitecturas de microservicios robustas y desacopladas.',
  'Implementar estrategias de caché distribuido con Redis.',
  'Optimizar bases de datos para millones de registros simultáneos.',
  'Gestionar balanceadores de carga y escalado horizontal automático.',
]

const MODULES = [
  { id: 1, title: 'Fundamentos de la Escalabilidad', lessons: 4, duration: '45 min', lessons_list: ['Escalabilidad Vertical vs Horizontal', 'Latencia vs Throughput'] },
  { id: 2, title: 'Arquitectura de Datos', lessons: 6, duration: '1h 20min', lessons_list: [] },
  { id: 3, title: 'Microservicios y API Gateway', lessons: 8, duration: '2h 05min', lessons_list: [] },
]

const REQUIREMENTS = [
  'Conocimientos sólidos en algún lenguaje de programación backend (Java, Python o Node.js).',
  'Entendimiento básico de bases de datos relacionales y NoSQL.',
  'Familiaridad con conceptos de redes y protocolos HTTP.',
  'No es necesaria la experiencia previa en arquitectura a gran escala.',
]

export default function CourseDetailScreen({ navigation }: any) {
  const [expandedModule, setExpandedModule] = useState<number | null>(1)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Video cover */}
        <TouchableOpacity
          style={styles.videoCover}
          onPress={() => navigation.navigate('Lesson')}
          activeOpacity={0.9}
        >
          <View style={styles.playBtn}>
            <Ionicons name="play" size={24} color={colors.white} />
          </View>
        </TouchableOpacity>

        {/* Course info */}
        <View style={styles.infoSection}>
          <Text style={styles.courseTitle}>Arquitectura de Sistemas Escalables</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={14} color={colors.accentAmber} />
            <Text style={styles.rating}>4.9</Text>
            <Text style={styles.metaSeparator}>·</Text>
            <Text style={styles.metaText}>(15,320 estudiantes)</Text>
            <Text style={styles.metaSeparator}>·</Text>
            <Ionicons name="person-outline" size={13} color={colors.textMuted} />
            <Text style={styles.metaText}>Julian Aranda</Text>
          </View>
          <View style={styles.bestSellerBadge}>
            <Text style={styles.bestSellerText}>Best Seller</Text>
          </View>
        </View>

        {/* Lo que aprenderás */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lo que aprenderás</Text>
          <View style={styles.learningCard}>
            {LEARNINGS.map((item, i) => (
              <View key={i} style={styles.learningItem}>
                <Ionicons name="checkmark-circle-outline" size={16} color={colors.successText} />
                <Text style={styles.learningText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contenido del curso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contenido del curso</Text>
          {MODULES.map((mod) => (
            <View key={mod.id} style={styles.accordionItem}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={expandedModule === mod.id ? 'chevron-down' : 'chevron-forward'}
                  size={16}
                  color={colors.textMuted}
                />
                <View style={styles.accordionInfo}>
                  <Text style={styles.moduleTitle}>Módulo {mod.id}: {mod.title}</Text>
                  <Text style={styles.moduleMeta}>{mod.lessons} lecciones · {mod.duration}</Text>
                </View>
              </TouchableOpacity>
              {expandedModule === mod.id && mod.lessons_list.length > 0 && (
                <View style={styles.accordionBody}>
                  {mod.lessons_list.map((lesson, i) => (
                    <View key={i} style={styles.lessonRow}>
                      <Ionicons name="play-circle-outline" size={14} color={colors.textMuted} />
                      <Text style={styles.lessonTitle}>{lesson}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Requisitos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          {REQUIREMENTS.map((req, i) => (
            <Text key={i} style={styles.reqText}>{req}</Text>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky bottom */}
      <View style={styles.stickyBottom}>
        <View>
          <Text style={styles.priceText}>$49.99</Text>
          <Text style={styles.discountText}>Descuento aplicado</Text>
        </View>
        <TouchableOpacity
          style={styles.enrollBtn}
          onPress={() => navigation.navigate('Roadmap')}
          activeOpacity={0.85}
        >
          <Text style={styles.enrollBtnText}>Inscribirme ahora</Text>
        </TouchableOpacity>
      </View>

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
  videoCover: {
    height: 210,
    backgroundColor: '#1A2B28',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    backgroundColor: colors.white,
    padding: spacing.md,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  courseTitle: { fontSize: fontSize.headingLg, fontWeight: '700', color: colors.textPrimary, lineHeight: 30 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  rating: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.accentAmber },
  metaSeparator: { fontSize: fontSize.bodySm, color: colors.border },
  metaText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  bestSellerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.activeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bestSellerText: { fontSize: 11, fontWeight: '600', color: colors.successText },
  section: { padding: spacing.md, gap: spacing.sm },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  learningCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  learningItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  learningText: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary, lineHeight: 22 },
  accordionItem: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    gap: 10,
  },
  accordionInfo: { flex: 1 },
  moduleTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  moduleMeta: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  accordionBody: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    gap: 8,
  },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lessonTitle: { fontSize: fontSize.bodySm, color: colors.textMuted },
  reqText: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22 },
  stickyBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceText: { fontSize: 22, fontWeight: '700', color: colors.primary },
  discountText: { fontSize: 11, color: colors.accentAmber, fontWeight: '500' },
  enrollBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: radius.md,
  },
  enrollBtnText: { fontSize: fontSize.body, fontWeight: '700', color: colors.white },
})
