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

const FILTERS = ['Todos', 'Diseño', 'Tecnología']

const FEATURED = [
  {
    id: 'f1',
    badge: 'TOP VENTAS',
    badgeColor: colors.accentViolet,
    category: 'DISEÑO UX/UI',
    rating: '4.9',
    title: 'Máster en Product Design: De la idea al prototipo real',
    description: 'Domina las herramientas líderes de la industria y crea experiencias de usuario que impacten a millones de...',
    price: '$129.00',
    large: true,
  },
  {
    id: 'f2',
    badge: null,
    badgeColor: null,
    category: 'TECNOLOGÍA',
    rating: '4.8',
    title: 'Arquitectura de Microservicios con Go',
    description: null,
    price: '$129.00',
    large: false,
  },
]

const MORE_COURSES = [
  { id: 'm1', category: 'NEGOCIOS', title: 'Estrategias de Marketing Digital para Startups', price: '$129.00', duration: '12h de contenido', level: 'Principiante' },
  { id: 'm2', category: 'TECNOLOGÍA', title: 'Análisis de Datos con Python y Pandas', price: '$129.00', duration: '24h de contenido', level: 'Intermedio' },
  { id: 'm3', category: 'DISEÑO', title: 'Branding Visual: Crea identidades memorables', price: '$129.00', duration: '16h de contenido', level: 'Avanzado' },
]

export default function CatalogScreen({ navigation }: any) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [apiCourses, setApiCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    coursesService.getAll({ status: 'published' })
      .then(setApiCourses)
      .finally(() => setLoading(false))
  }, [])

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Hero text + search */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Explora tu futuro</Text>
          <View style={styles.searchWrapper}>
            <Ionicons name="search-outline" size={18} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder="¿Qué quieres aprender hoy?"
              placeholderTextColor={colors.placeholder}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cursos Destacados */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>Cursos Destacados</Text>
              <Text style={styles.sectionSub}>Los más valorados por nuestra comunidad académica</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>Ver todos →</Text>
            </TouchableOpacity>
          </View>

          {/* Large featured card */}
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => navigation.navigate('CourseDetail', { courseId: FEATURED[0].id })}
            activeOpacity={0.9}
          >
            <View style={styles.featuredImg}>
              <Ionicons name="laptop-outline" size={44} color="rgba(255,255,255,0.3)" />
              {FEATURED[0].badge && (
                <View style={[styles.featuredBadge, { backgroundColor: FEATURED[0].badgeColor ?? colors.accentViolet }]}>
                  <Text style={styles.featuredBadgeText}>{FEATURED[0].badge}</Text>
                </View>
              )}
            </View>
            <View style={styles.featuredBody}>
              <View style={styles.metaRow}>
                <Text style={styles.categoryTag}>{FEATURED[0].category}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color={colors.accentAmber} />
                  <Text style={styles.rating}>{FEATURED[0].rating}</Text>
                </View>
              </View>
              <Text style={styles.featuredTitle}>{FEATURED[0].title}</Text>
              <Text style={styles.featuredDesc} numberOfLines={2}>{FEATURED[0].description}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{FEATURED[0].price}</Text>
                <TouchableOpacity style={styles.viewBtn} activeOpacity={0.8} onPress={() => navigation.navigate('CourseDetail', { courseId: FEATURED[0].id })}>
                  <Text style={styles.viewBtnText}>Ver Curso</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Second featured card (compact) */}
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => navigation.navigate('CourseDetail', { courseId: FEATURED[1].id })}
            activeOpacity={0.9}
          >
            <View style={[styles.featuredImg, { height: 140 }]}>
              <Ionicons name="code-slash-outline" size={44} color="rgba(255,255,255,0.3)" />
            </View>
            <View style={styles.featuredBody}>
              <View style={styles.metaRow}>
                <Text style={styles.categoryTag}>{FEATURED[1].category}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color={colors.accentAmber} />
                  <Text style={styles.rating}>{FEATURED[1].rating}</Text>
                </View>
              </View>
              <Text style={styles.featuredTitle}>{FEATURED[1].title}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{FEATURED[1].price}</Text>
                <View style={styles.eyeBtn}>
                  <Ionicons name="eye-outline" size={18} color={colors.textMuted} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Más cursos para ti */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Más cursos para ti</Text>
          <Text style={styles.sectionSub}>Explora nuestra biblioteca completa de especializaciones</Text>

          {MORE_COURSES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.listCard}
              onPress={() => navigation.navigate('CourseDetail', { courseId: c.id })}
              activeOpacity={0.85}
            >
              <View style={styles.listImg}>
                <Ionicons name="laptop-outline" size={24} color="rgba(255,255,255,0.4)" />
              </View>
              <View style={styles.listInfo}>
                <Text style={styles.listCategory}>{c.category}</Text>
                <Text style={styles.listTitle} numberOfLines={2}>{c.title}</Text>
                <View style={styles.listMeta}>
                  <Ionicons name="time-outline" size={11} color={colors.textMuted} />
                  <Text style={styles.listMetaText}>{c.duration}</Text>
                  <Ionicons name="trending-up-outline" size={11} color={colors.textMuted} style={{ marginLeft: 8 }} />
                  <Text style={styles.listMetaText}>{c.level}</Text>
                </View>
              </View>
              <View style={styles.listRight}>
                <Text style={styles.listPrice}>{c.price}</Text>
                <TouchableOpacity style={styles.cartBtn} activeOpacity={0.8} onPress={() => navigation.navigate('CourseDetail', { courseId: c.id })}>
                  <Ionicons name="cart-outline" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
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
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '600', color: colors.avatarText },
  scroll: { flex: 1 },
  heroSection: { padding: spacing.md, paddingBottom: spacing.sm, backgroundColor: colors.white },
  heroTitle: { fontSize: fontSize.headingLg, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  filtersScroll: { backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border, maxHeight: 52 },
  filtersContent: { paddingHorizontal: spacing.md, paddingVertical: 10, gap: 8, flexDirection: 'row' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: fontSize.bodySm, color: colors.textMuted, fontWeight: '400' },
  chipTextActive: { color: colors.white, fontWeight: '500' },
  section: { padding: spacing.md, gap: spacing.sm },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  sectionTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  sectionSub: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  seeAll: { fontSize: fontSize.bodySm, color: colors.primary, fontWeight: '500' },
  featuredCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  featuredImg: {
    height: 180,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  featuredBadgeText: { fontSize: 9, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  featuredBody: { padding: 14, gap: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  categoryTag: { fontSize: 10, fontWeight: '600', color: colors.successText, letterSpacing: 0.3 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textMuted },
  featuredTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary, lineHeight: 22 },
  featuredDesc: { fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  price: { fontSize: fontSize.headingSm, fontWeight: '700', color: colors.textPrimary },
  viewBtn: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.md },
  viewBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.white },
  eyeBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 12,
  },
  listImg: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  listInfo: { flex: 1, gap: 3 },
  listCategory: { fontSize: 10, fontWeight: '600', color: colors.successText, letterSpacing: 0.3 },
  listTitle: { fontSize: 13, fontWeight: '500', color: colors.textPrimary, lineHeight: 18 },
  listMeta: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  listMetaText: { fontSize: 11, color: colors.textMuted },
  listRight: { alignItems: 'flex-end', gap: 8 },
  listPrice: { fontSize: fontSize.bodySm, fontWeight: '700', color: colors.textPrimary },
  cartBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
