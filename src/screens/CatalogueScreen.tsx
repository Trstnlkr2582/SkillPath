import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
    Platform,
    StatusBar,
    Image,
    ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator';
import BottomNavBar, { NavKey } from '../components/BottomNavBar';
import { SafeAreaView } from "react-native-safe-area-context";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES  (reflejan la forma esperada del API)
// ─────────────────────────────────────────────────────────────────────────────

/** TODO: API → GET /catalogue/filters */
export interface CatalogueFilter {
    id: string;
    label: string;
}

/** TODO: API → GET /courses/featured  |  GET /courses/:id */
export interface FeaturedCourse {
    id: string;
    category: string;
    title: string;
    instructor: string;
    rating: number;         // 0–5
    studentsCount: number;  // se formatea a "2.3k" en UI
    durationHours: number;  // se formatea a "24h" en UI
    price: number;          // en USD; null = gratis
    currency: string;       // "USD", "COP", etc.
    thumbnailUrl: string;
    tag: string | null;     // "Más popular", "Nuevo", etc.
}

/** TODO: API → GET /courses?page=1&limit=10&filter=<id> */
export interface Course {
    id: string;
    category: string;
    title: string;
    instructor: string;
    rating: number;
    durationHours: number;
    price: number;
    currency: string;
    thumbnailUrl: string;
}

/** TODO: API → GET /users/me  (sesión activa) */
export interface UserProfile {
    id: string;
    displayName: string;
    avatarUrl: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA  — reemplazar con llamadas al API cuando el backend esté listo
// ─────────────────────────────────────────────────────────────────────────────

// TODO: API → GET /catalogue/filters
const MOCK_FILTERS: CatalogueFilter[] = [
    { id: 'all', label: 'Todos' },
    { id: 'design', label: 'Diseño' },
    { id: 'dev', label: 'Desarrollo' },
    { id: 'biz', label: 'Negocios' },
];

// TODO: API → GET /courses/featured?slot=large
const MOCK_FEATURED_LARGE: FeaturedCourse = {
    id: 'course-001',
    category: 'Diseño UX/UI',
    title: 'Fundamentos de Diseño de Interfaces Modernas',
    instructor: 'María González',
    rating: 4.8,
    studentsCount: 2300,
    durationHours: 24,
    price: 49.99,
    currency: 'USD',
    thumbnailUrl: 'https://picsum.photos/seed/course1/400/256',
    tag: 'Más popular',
};

// TODO: API → GET /courses/featured?slot=small
const MOCK_FEATURED_SMALL: FeaturedCourse = {
    id: 'course-002',
    category: 'Desarrollo Web',
    title: 'React Native: Apps Multiplataforma',
    instructor: 'Carlos Ruiz',
    rating: 4.9,
    studentsCount: 1800,
    durationHours: 18,
    price: 39.99,
    currency: 'USD',
    thumbnailUrl: 'https://picsum.photos/seed/course2/400/192',
    tag: 'Nuevo',
};

// TODO: API → GET /courses?page=1&limit=10
const MOCK_COURSES: Course[] = [
    {
        id: 'course-003',
        category: 'Backend',
        title: 'Node.js & Arquitectura de Microservicios para Producción',
        instructor: 'Ana Torres',
        rating: 4.7,
        durationHours: 32,
        price: 54.99,
        currency: 'USD',
        thumbnailUrl: 'https://picsum.photos/seed/course3/80/80',
    },
    {
        id: 'course-004',
        category: 'Cloud',
        title: 'AWS Solutions Architect desde Cero',
        instructor: 'Pedro Sánchez',
        rating: 4.6,
        durationHours: 20,
        price: 44.99,
        currency: 'USD',
        thumbnailUrl: 'https://picsum.photos/seed/course4/80/80',
    },
    {
        id: 'course-005',
        category: 'Game Dev',
        title: 'Godot 4: Videojuegos con GDScript',
        instructor: 'Luis Mora',
        rating: 4.9,
        durationHours: 28,
        price: 59.99,
        currency: 'USD',
        thumbnailUrl: 'https://picsum.photos/seed/course5/80/80',
    },
];

// TODO: API → GET /users/me
const MOCK_USER: UserProfile = {
    id: 'user-001',
    displayName: 'Tristán',
    avatarUrl: 'https://picsum.photos/seed/avatar/40/40',
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function formatStudents(count: number): string {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
}

function formatPrice(price: number, currency: string): string {
    // TODO: usar i18n / Intl.NumberFormat cuando se integre localización
    return `$${price.toFixed(2)} ${currency}`;
}

function formatDuration(hours: number): string {
    return `${hours}h`;
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS  (extraídos del Figma: frame 164:1465)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
    primary: '#075343',
    primaryDk: '#063E3B',
    surface: '#FFFFFF',
    bg: '#F4F7F5',
    border: '#D5E6E4',
    borderNav: '#E2E8F0',
    textPrimary: '#0F1E1D',
    textSec: '#3F4945',
    textMuted: '#949FB8',
    navActive: '#065F46',
    amber: '#F59E0B',
};

// ─────────────────────────────────────────────────────────────────────────────
// NAV ITEMS  (estáticos — rutas definidas por el navegador)
// ─────────────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { key: 'inicio', label: 'Inicio', icon: 'home' as const },
    { key: 'cursos', label: 'Cursos', icon: 'book-open' as const },
    { key: 'progreso', label: 'Mi Progreso', icon: 'bar-chart-2' as const },
    { key: 'tareas', label: 'Tareas', icon: 'check-square' as const },
    { key: 'perfil', label: 'Perfil', icon: 'user' as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTES
// ─────────────────────────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Feather name="star" size={12} color={C.amber} />
            <Text style={{ fontSize: 12, color: C.textSec, fontWeight: '600' }}>
                {rating}
            </Text>
        </View>
    );
}

function CategoryBadge({ label }: { label: string }) {
    return (
        <View style={s.badge}>
            <Text style={s.badgeText}>{label}</Text>
        </View>
    );
}

/** Skeleton genérico — mostrar mientras isLoading === true */
function SkeletonBlock({ height, borderRadius = 8, style }: {
    height: number;
    borderRadius?: number;
    style?: object;
}) {
    return (
        <View
            style={[
                { height, borderRadius, backgroundColor: '#E8EFED' },
                style,
            ]}
        />
    );
}

// ─── Featured Large Card ──────────────────────────────────────────────────────

interface FeaturedLargeCardProps {
    course: FeaturedCourse;
    width: number;
    // TODO: onPress → navigation.navigate('CourseDetailScreen', { courseId: course.id })
    onPress?: (course: FeaturedCourse) => void;
}

function FeaturedLargeCard({ course, width, onPress }: FeaturedLargeCardProps) {
    const imgHeight = Math.round(width * 0.48);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const NAV_ROUTE_MAP: Partial<Record<NavKey, keyof RootStackParamList>> = {
        Dashboard: 'Dashboard',
        Catalogue: 'Catalogue',
    };

    return (
        <TouchableOpacity
            activeOpacity={0.92}
            style={[s.card, { width }]}
            onPress={() => onPress?.(course)}
        >
            <View style={s.cardImageContainer}>
                <Image
                    source={{ uri: course.thumbnailUrl }}
                    style={[s.cardImage, { height: imgHeight }]}
                    resizeMode="cover"
                />
                {course.tag && (
                    <View style={s.tagChip}>
                        <Text style={s.tagChipText}>{course.tag}</Text>
                    </View>
                )}
            </View>

            <View style={s.cardBodyLg}>
                <CategoryBadge label={course.category} />
                <Text style={s.cardTitle} numberOfLines={3}>{course.title}</Text>
                <Text style={s.cardInstructor}>{course.instructor}</Text>

                <View style={s.cardMeta}>
                    <StarRow rating={course.rating} />
                    <Text style={s.cardMetaText}>
                        · {formatStudents(course.studentsCount)} alumnos
                    </Text>
                    <Text style={s.cardMetaText}>
                        · {formatDuration(course.durationHours)}
                    </Text>
                </View>

                <View style={s.cardFooter}>
                    <Text style={s.priceText}>
                        {formatPrice(course.price, course.currency)}
                    </Text>
                    {/* TODO: onPress → POST /enrollments { courseId: course.id } */}
                    <TouchableOpacity style={s.enrollBtn}>
                        <Text style={s.enrollBtnText}>Inscribirse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// ─── Featured Small Card ──────────────────────────────────────────────────────

interface FeaturedSmallCardProps {
    course: FeaturedCourse;
    width: number;
    onPress?: (course: FeaturedCourse) => void;
}

function FeaturedSmallCard({ course, width, onPress }: FeaturedSmallCardProps) {
    const imgHeight = Math.round(width * 0.36);
    return (
        <TouchableOpacity
            activeOpacity={0.92}
            style={[s.card, { width }]}
            onPress={() => onPress?.(course)}
        >
            <View style={s.cardImageContainer}>
                <Image
                    source={{ uri: course.thumbnailUrl }}
                    style={[s.cardImage, { height: imgHeight }]}
                    resizeMode="cover"
                />
                {course.tag && (
                    <View style={s.tagChip}>
                        <Text style={s.tagChipText}>{course.tag}</Text>
                    </View>
                )}
            </View>

            <View style={s.cardBodySm}>
                <CategoryBadge label={course.category} />
                <Text style={s.cardTitle} numberOfLines={2}>{course.title}</Text>
                <Text style={s.cardInstructor}>{course.instructor}</Text>
                <View style={s.cardFooter}>
                    <StarRow rating={course.rating} />
                    <Text style={s.priceText}>
                        {formatPrice(course.price, course.currency)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// ─── Course List Item ─────────────────────────────────────────────────────────

interface CourseListItemProps {
    course: Course;
    onPress?: (course: Course) => void;
}

function CourseListItem({ course, onPress }: CourseListItemProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.88}
            style={s.listItem}
            onPress={() => onPress?.(course)}
        >
            <Image
                source={{ uri: course.thumbnailUrl }}
                style={s.listThumb}
                resizeMode="cover"
            />
            <View style={s.listContent}>
                <CategoryBadge label={course.category} />
                <Text style={s.listTitle} numberOfLines={3}>{course.title}</Text>
                <Text style={s.cardInstructor}>{course.instructor}</Text>
                <View style={s.listMeta}>
                    <StarRow rating={course.rating} />
                    <Text style={s.cardMetaText}>
                        · {formatDuration(course.durationHours)}
                    </Text>
                </View>
                <Text style={[s.priceText, { marginTop: 8 }]}>
                    {formatPrice(course.price, course.currency)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// CATALOGUE SCREEN
// ─────────────────────────────────────────────────────────────────────────────

export default function CatalogueScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
        const NAV_ROUTE_MAP: Partial<Record<NavKey, keyof RootStackParamList>> = {
            Dashboard: 'Dashboard',
            Catalogue: 'Catalogue',
        };
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const hPad = isTablet ? 32 : 16;
    const cardWidth = isTablet
        ? Math.floor((width - hPad * 2 - 24) / 2)
        : width - hPad * 2;

    // ── Estado de UI ────────────────────────────────────────────────────────────
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [activeNav, setActiveNav] = useState<NavKey>('Catalogue');

    // ── Estado API  (conectar con hooks/stores cuando el backend esté listo) ────
    // TODO: reemplazar con → const { data: filters, isLoading } = useQuery(['filters'], fetchFilters)
    const isLoadingFilters = false;
    const isLoadingFeatured = false;
    const isLoadingCourses = false;
    // TODO: API → manejar error con un Toast o banner inline
    const errorCourses: string | null = null;

    // TODO: API → GET /users/me
    const user: UserProfile = MOCK_USER;

    // TODO: API → GET /catalogue/filters
    const filters: CatalogueFilter[] = MOCK_FILTERS;

    // TODO: API → GET /courses/featured?slot=large
    const featuredLarge: FeaturedCourse = MOCK_FEATURED_LARGE;

    // TODO: API → GET /courses/featured?slot=small
    const featuredSmall: FeaturedCourse = MOCK_FEATURED_SMALL;

    // TODO: API → GET /courses?page=1&limit=10&filter=<activeFilter>&q=<search>
    const courses: Course[] = MOCK_COURSES;

    // ── Handlers ────────────────────────────────────────────────────────────────

    // TODO: conectar a la navegación (React Navigation / Expo Router)
    const handleFeaturedPress = (course: FeaturedCourse) => {
        console.log('[CatalogueScreen] navigate → CourseDetailScreen', course.id);
    };

    const handleCoursePress = (course: Course) => {
        console.log('[CatalogueScreen] navigate → CourseDetailScreen', course.id);
    };

    // TODO: debounce + llamada API al cambiar search
    const handleSearchChange = (text: string) => {
        setSearch(text);
    };

    // TODO: refetch courses con nuevo filtro
    const handleFilterPress = (filterId: string) => {
        setActiveFilter(filterId);
    };

    // ── Render ──────────────────────────────────────────────────────────────────
    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={C.surface} />

            {/* ── TOP APP BAR ── */}
            <View style={s.topBar}>
                <View style={s.logoRow}>
                    <Feather name="menu" size={18} color={C.primary} />
                    <Text style={s.logoText}>SkillPath</Text>
                </View>

                {/* TODO: API → avatar desde user.avatarUrl */}
                <View style={s.avatarBorder}>
                    {user.avatarUrl ? (
                        <Image source={{ uri: user.avatarUrl }} style={s.avatarImg} />
                    ) : (
                        // Fallback: inicial del usuario
                        <View style={[s.avatarImg, s.avatarFallback]}>
                            <Text style={s.avatarInitial}>
                                {user.displayName.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* ── SCROLL CONTENT ── */}
            <ScrollView
                contentContainerStyle={[s.scroll, { paddingHorizontal: hPad }]}
                showsVerticalScrollIndicator={false}
            >

                {/* ── SECTION: HERO SEARCH & FILTERS (Figma: 164:1467) ── */}
                <View style={s.heroSection}>
                    {/* TODO: API → título personalizado desde user.displayName */}
                    <Text style={s.heroTitle}>Explora tu futuro</Text>

                    {/* Barra de búsqueda */}
                    <View style={s.searchWrapper}>
                        <Feather name="search" size={18} color={C.textMuted} style={s.searchIcon} />
                        <TextInput
                            style={s.searchInput}
                            placeholder="Buscar cursos, instructores..."
                            placeholderTextColor={C.textMuted}
                            value={search}
                            onChangeText={handleSearchChange}
                            returnKeyType="search"
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <Feather name="x" size={16} color={C.textMuted} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Filtros pill — TODO: API → GET /catalogue/filters */}
                    {isLoadingFilters ? (
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            {[80, 70, 95, 80].map((w, i) => (
                                <SkeletonBlock key={i} height={40} style={{ width: w, borderRadius: 12 }} />
                            ))}
                        </View>
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8 }}
                        >
                            {filters.map((f) => (
                                <TouchableOpacity
                                    key={f.id}
                                    style={[s.pill, activeFilter === f.id && s.pillActive]}
                                    onPress={() => handleFilterPress(f.id)}
                                >
                                    <Text style={[s.pillText, activeFilter === f.id && s.pillTextActive]}>
                                        {f.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* ── SECTION: FEATURED COURSES BENTO (Figma: 164:1486) ── */}
                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <View>
                            {/* TODO: API → título de sección desde CMS/config */}
                            <Text style={s.sectionTitle}>Cursos destacados</Text>
                            <Text style={s.sectionSub}>Seleccionados para ti</Text>
                        </View>
                        {/* TODO: onPress → navigate a lista completa de destacados */}
                        <TouchableOpacity style={s.verTodos}>
                            <Text style={s.verTodosText}>{'Ver\ntodos'}</Text>
                            <Feather name="chevron-right" size={14} color={C.primary} />
                        </TouchableOpacity>
                    </View>

                    {isLoadingFeatured ? (
                        <View style={{ gap: 24 }}>
                            <SkeletonBlock height={isTablet ? 300 : 420} />
                            <SkeletonBlock height={isTablet ? 260 : 320} />
                        </View>
                    ) : isTablet ? (
                        <View style={{ flexDirection: 'row', gap: 24 }}>
                            <FeaturedLargeCard
                                course={featuredLarge}
                                width={cardWidth}
                                onPress={handleFeaturedPress}
                            />
                            <FeaturedSmallCard
                                course={featuredSmall}
                                width={cardWidth}
                                onPress={handleFeaturedPress}
                            />
                        </View>
                    ) : (
                        <View style={{ gap: 24 }}>
                            <FeaturedLargeCard
                                course={featuredLarge}
                                width={cardWidth}
                                onPress={handleFeaturedPress}
                            />
                            <FeaturedSmallCard
                                course={featuredSmall}
                                width={cardWidth}
                                onPress={handleFeaturedPress}
                            />
                        </View>
                    )}
                </View>

                {/* ── SECTION: OTHER COURSES LIST (Figma: 164:1544) ── */}
                <View style={[s.section, { paddingTop: 16 }]}>
                    {/* TODO: API → título y subtítulo desde CMS/config */}
                    <Text style={s.sectionTitle}>Más cursos para ti</Text>
                    <Text style={[s.cardInstructor, { marginBottom: 16 }]}>
                        Explora nuestra biblioteca completa de especializaciones
                    </Text>

                    {isLoadingCourses ? (
                        <View style={{ gap: 16 }}>
                            {[1, 2, 3].map((i) => (
                                <SkeletonBlock key={i} height={120} />
                            ))}
                        </View>
                    ) : errorCourses ? (
                        // TODO: UI de error más elaborada (retry button)
                        <View style={s.errorBox}>
                            <Feather name="alert-circle" size={20} color={C.textMuted} />
                            <Text style={s.errorText}>{errorCourses}</Text>
                        </View>
                    ) : (
                        <View style={{ gap: 16 }}>
                            {courses.map((c) => (
                                <CourseListItem
                                    key={c.id}
                                    course={c}
                                    onPress={handleCoursePress}
                                />
                            ))}
                            {/* TODO: API → paginación / "load more" */}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* ── BOTTOM NAV BAR (Figma: 164:1625) ── */}
            <BottomNavBar
                activeKey={activeNav}
                onPress={(key) => {
                    setActiveNav(key)
                    var route = NAV_ROUTE_MAP[key];
                    if (route) {
                        navigation.replace(route);
                    }

                }}
            />
        </SafeAreaView>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.bg },

    // Top Bar
    topBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 12,
        backgroundColor: C.surface,
        borderBottomWidth: 1, borderBottomColor: C.borderNav,
    },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    logoText: { fontSize: 20, fontWeight: '700', color: C.primaryDk },
    avatarBorder: {
        width: 40, height: 40, borderRadius: 12,
        borderWidth: 1, borderColor: '#BEC9C4',
        overflow: 'hidden',
    },
    avatarImg: { width: '100%', height: '100%' },
    avatarFallback: { backgroundColor: C.border, alignItems: 'center', justifyContent: 'center' },
    avatarInitial: { fontSize: 16, fontWeight: '700', color: C.primary },

    // Scroll
    scroll: { paddingTop: 96, paddingBottom: 160 },

    // Hero Section
    heroSection: { gap: 16, marginBottom: 48 },
    heroTitle: { fontSize: 16, color: C.primary, lineHeight: 24 },
    searchWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: C.surface,
        borderWidth: 1, borderColor: C.border, borderRadius: 8,
        paddingHorizontal: 16, paddingVertical: 14,
        gap: 8,
    },
    searchIcon: {},
    searchInput: { flex: 1, fontSize: 15, color: C.textPrimary },

    // Filter Pills
    pill: {
        borderWidth: 1, borderColor: C.border, borderRadius: 12,
        paddingHorizontal: 24, paddingVertical: 9,
        backgroundColor: C.surface,
    },
    pillActive: { backgroundColor: C.primary, borderColor: C.primary },
    pillText: { fontSize: 14, color: C.textSec },
    pillTextActive: { color: C.surface, fontWeight: '600' },

    // Section
    section: { marginBottom: 48 },
    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'flex-end', marginBottom: 32,
    },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: C.textPrimary },
    sectionSub: { fontSize: 14, color: C.textSec, marginTop: 4 },
    verTodos: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    verTodosText: { fontSize: 14, color: C.primary, textAlign: 'center' },

    // Card base
    card: {
        backgroundColor: C.surface,
        borderRadius: 8, borderWidth: 1, borderColor: C.border,
        overflow: 'hidden',
        ...Platform.select({
            ios: { shadowColor: '#1C2B2A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
            android: { elevation: 3 },
        }),
    },
    cardImageContainer: { position: 'relative' },
    cardImage: { width: '100%' },
    tagChip: {
        position: 'absolute', top: 12, left: 12,
        backgroundColor: C.primary,
        borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4,
    },
    tagChipText: { color: C.surface, fontSize: 11, fontWeight: '600' },
    cardBodyLg: { padding: 32, gap: 8 },
    cardBodySm: { padding: 24, gap: 8 },
    cardTitle: { fontSize: 16, fontWeight: '600', color: C.textPrimary, lineHeight: 22 },
    cardInstructor: { fontSize: 13, color: C.textSec },
    cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
    cardMetaText: { fontSize: 12, color: C.textSec },
    cardFooter: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginTop: 8,
    },
    priceText: { fontSize: 16, fontWeight: '700', color: C.textPrimary },
    enrollBtn: { backgroundColor: C.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 9 },
    enrollBtnText: { color: C.surface, fontWeight: '600', fontSize: 14 },

    // Badge
    badge: {
        alignSelf: 'flex-start',
        borderRadius: 6, borderWidth: 1, borderColor: C.border,
        paddingHorizontal: 8, paddingVertical: 2,
    },
    badgeText: { fontSize: 11, color: C.textSec, fontWeight: '500' },

    // List item
    listItem: {
        flexDirection: 'row', gap: 16,
        backgroundColor: C.surface,
        borderRadius: 8, borderWidth: 1, borderColor: C.border,
        padding: 16,
    },
    listThumb: { width: 80, height: 80, borderRadius: 4 },
    listContent: { flex: 1, gap: 4 },
    listTitle: { fontSize: 14, fontWeight: '600', color: C.textPrimary, lineHeight: 20 },
    listMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },

    // Error
    errorBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16 },
    errorText: { fontSize: 14, color: C.textMuted },

    // Bottom Nav
    bottomBar: {
        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
        backgroundColor: C.surface,
        borderTopWidth: 1, borderTopColor: C.borderNav,
        paddingHorizontal: 28,
        paddingBottom: Platform.OS === 'ios' ? 20 : 8,
        ...Platform.select({
            ios: { shadowColor: '#1C2B2A', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 12 },
            android: { elevation: 8 },
        }),
    },
    navItem: { alignItems: 'center', justifyContent: 'center', paddingTop: 4, gap: 2, minWidth: 48 },
    navItemActive: { borderTopWidth: 2, borderTopColor: C.navActive, paddingTop: 2 },
    navLabel: { fontSize: 10, fontWeight: '500', color: C.textMuted },
    navLabelActive: { color: C.navActive },
});