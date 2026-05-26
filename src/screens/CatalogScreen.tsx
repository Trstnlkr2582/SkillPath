import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import BottomNavBar from '../components/BottomNavBar'
import { coursesService } from '../services/courses.service'
import { Course } from '../types'

const FILTERS = ['Todos', 'Tecnología', 'Diseño', 'Negocios', 'Ciencias']

const COURSES = [
  {
    id: '1',
    title: 'Arquitectura de Sistemas Escalables',
    category: 'Tecnología',
    duration: '24h',
    status: 'active',
    modules: 8,
  },
  {
    id: '2',
    title: 'Diseño de Interfaces Avanzado',
    category: 'Diseño',
    duration: '18h',
    status: 'new',
    modules: 6,
  },
  {
    id: '3',
    title: 'Estrategia de Producto Digital',
    category: 'Negocios',
    duration: '20h',
    status: 'active',
    modules: 7,
  },
  {
    id: '4',
    title: 'Machine Learning Aplicado',
    category: 'Tecnología',
    duration: '32h',
    status: 'new',
    modules: 10,
  },
  {
    id: '5',
    title: 'Gestión Ágil de Proyectos',
    category: 'Negocios',
    duration: '16h',
    status: 'active',
    modules: 5,
  },
]

export default function CatalogScreen({ navigation }: any) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [apiCourses, setApiCourses] = useState<Course[]>([])
  const [loadingApi, setLoadingApi] = useState(true)

  useEffect(() => {
    coursesService.getAll({ status: 'published' })
      .then(setApiCourses)
      .finally(() => setLoadingApi(false))
  }, [])

  // Mezcla datos reales con los de ejemplo (fallback si la API no tiene datos aún)
  const source = apiCourses.length > 0
    ? apiCourses.map((c) => ({
        id: c.id,
        title: c.title,
        category: c.category,
        duration: `${c.estimated_hours}h`,
        status: 'active' as const,
        modules: 0,
        price: 129,
      }))
    : COURSES.map((c: any) => ({ ...c, price: 129 }))

  const filtered = source.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = activeFilter === 'Todos' || c.category === activeFilter
    return matchesQuery && matchesFilter
  })

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primaryDark} />

      {/* Hero header */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Explora tu futuro</Text>
        {/* Search */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="¿Qué quieres aprender hoy?"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cursos disponibles</Text>
          <Text style={styles.sectionCount}>{filtered.length} cursos</Text>
        </View>

        {/* Course cards */}
        <View style={styles.courseList}>
          {filtered.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => navigation.navigate('CourseDetail', { course })}
              activeOpacity={0.8}
            >
              {/* Cover */}
              <View style={styles.courseCover}>
                <Ionicons name="play-circle-outline" size={28} color={colors.white} />
              </View>
              {/* Info */}
              <View style={styles.courseInfo}>
                <View style={styles.courseTopRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{course.category}</Text>
                  </View>
                  {course.status === 'new' && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>Nuevo</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                <View style={styles.courseMeta}>
                  <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.courseMetaText}>{course.duration}</Text>
                  <Ionicons name="layers-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.courseMetaText}>{course.modules} módulos</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <BottomNavBar activeTab="Catalog" navigation={navigation} />
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
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 44,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: fontSize.body, color: colors.white },
  filtersScroll: { backgroundColor: colors.white, maxHeight: 52 },
  filtersContent: { paddingHorizontal: spacing.md, paddingVertical: 10, gap: spacing.sm, flexDirection: 'row' },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  filterChipActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  filterText: { fontSize: fontSize.bodySm, color: colors.textMuted, fontWeight: '400' },
  filterTextActive: { color: colors.primary, fontWeight: '500' },
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
  sectionCount: { fontSize: fontSize.bodySm, color: colors.textMuted },
  courseList: { paddingHorizontal: spacing.md, gap: spacing.sm },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  courseCover: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseInfo: { flex: 1, gap: 6 },
  courseTopRow: { flexDirection: 'row', gap: spacing.xs },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  categoryBadgeText: { fontSize: fontSize.caption, fontWeight: '500', color: colors.successText },
  newBadge: {
    backgroundColor: colors.progressBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  newBadgeText: { fontSize: fontSize.caption, fontWeight: '500', color: colors.progressText },
  courseTitle: { fontSize: fontSize.headingSm, fontWeight: '500', color: colors.textPrimary, lineHeight: 22 },
  courseMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  courseMetaText: { fontSize: fontSize.caption, color: colors.textMuted, marginRight: spacing.xs },
})
