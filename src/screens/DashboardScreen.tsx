import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
    useWindowDimensions,
    StyleSheet,
} from 'react-native';
import { basic } from '../styles/Layouts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Streak from '../components/streak';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/Progressbar';
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar, { NavKey } from '../components/BottomNavBar';
import { RootStackParamList } from '../navigation/navigator';

// ── mock data ────────────────────────────────────────────────────────────────
const MOCK_COURSES = [
    {
        id: '1',
        title: 'Fundamentos de Product Management',
        category: 'Producto',
        progress: 74,
        totalLessons: 24,
        completedLessons: 18,
        tag: 'En progreso',
    },
    {
        id: '2',
        title: 'Métricas y Analytics para PM',
        category: 'Datos',
        progress: 30,
        totalLessons: 16,
        completedLessons: 5,
        tag: 'En progreso',
    },
    {
        id: '3',
        title: 'UX Research Aplicado',
        category: 'Diseño',
        progress: 100,
        totalLessons: 12,
        completedLessons: 12,
        tag: 'Completado',
    },
];

const MOCK_UPCOMING = [
    { id: 'u1', title: 'Workshop: Roadmap Planning', date: 'Hoy, 4:00 PM', type: 'live' },
    { id: 'u2', title: 'Entrega: Caso de Estudio Sprint', date: 'Mañana, 11:59 PM', type: 'task' },
    { id: 'u3', title: 'Quiz: Métricas OKR', date: 'Vie, 9:00 AM', type: 'quiz' },
];

// ── helpers ───────────────────────────────────────────────────────────────────
function tagColor(tag: string) {
    if (tag === 'Completado') return { bg: '#D1FAE5', text: '#065F46' };
    return { bg: '#FEF3C7', text: '#92400E' };
}

function upcomingIcon(type: string) {
    if (type === 'live') return '🎥';
    if (type === 'task') return '📝';
    return '✅';
}

// ── main component ────────────────────────────────────────────────────────────
export default function DashboardScreen() {
    const { width } = useWindowDimensions();
    const isWide = width > 600;
    const [activeNav, setActiveNav] = useState<NavKey>('Dashboard');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const NAV_ROUTE_MAP: Partial<Record<NavKey, keyof RootStackParamList>> = {
        Dashboard: 'Dashboard',
        Catalogue: 'Catalogue',
    };

    // stats
    const username = 'Alex';
    const weekObj = 85;
    const career = 'Product Manager';
    const done = 74;
    const studyHours = 128;
    const finishCourses = 14;
    const streakDays = 12;


    return (
        <SafeAreaView style={styles.root}>
            {/* ── Header TopAppBar ─────────────────────────── */}
            <View style={[styles.topBar, isWide && styles.topBarWide]}>
                <Text style={styles.topBarTitle}>SkillPath</Text>
                <View style={styles.topBarRight}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarInitial}>{username.charAt(0)}</Text>
                    </View>
                </View>
            </View>

            {/* ── Scrollable body ──────────────────────────── */}
            <ScrollView
                style={{ flex: 1, backgroundColor: '#F4F6F5' }}
                contentContainerStyle={[
                    styles.scrollContent,
                    isWide && styles.scrollContentWide,
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* greeting */}
                <Text
                    style={[
                        basic.title1,
                        styles.greeting,
                        isWide && styles.greetingWide,
                    ]}
                >
                    ¡Bienvenido de{Platform.OS !== 'web' ? '\n' : ' '}nuevo, {username}!
                </Text>
                <Text style={[basic.text, styles.subGreeting, isWide && styles.subGreetingWide]}>
                    Has completado el {weekObj}% de tus objetivos semanales. ¡Sigue así!
                </Text>

                {/* ── Two-column layout on wide ─────────────── */}
                <View style={[styles.columns, isWide && styles.columnsWide]}>
                    {/* LEFT: Progreso General */}
                    <View
                        style={[
                            basic.modal,
                            styles.card,
                            isWide && styles.cardHalf,
                        ]}
                    >
                        {/* card header */}
                        <View style={styles.cardHeader}>
                            <Text
                                style={[
                                    basic.title2,
                                    styles.cardTitle,
                                    isWide && { fontSize: 28 },
                                ]}
                            >
                                Progreso{Platform.OS !== 'web' ? '\n' : ' '}General
                            </Text>
                            <Streak days={streakDays} />
                        </View>

                        {/* career label */}
                        <Text style={[basic.rawMedium, styles.careerLabel]}>
                            Ruta de Carrera:{' '}
                            <Text style={{ color: '#075343' }}>{career}</Text>
                        </Text>

                        {/* donut-style progress circle */}
                        <View style={styles.progressCircle}>
                            <Text style={styles.progressPercent}>{done}%</Text>
                            <Text style={[basic.rawText, { fontSize: 13, color: '#3F4945' }]}>
                                completado
                            </Text>
                        </View>

                        {/* week progress bar */}
                        <View style={styles.weekBarWrapper}>
                            <View style={styles.weekBarLabels}>
                                <Text style={[basic.rawMedium, styles.weekBarLabel]}>
                                    Objetivo semanal
                                </Text>
                                <Text style={[basic.rawMedium, styles.weekBarLabel]}>
                                    {weekObj}%
                                </Text>
                            </View>
                            <ProgressBar progress={weekObj} color="#075343" />
                        </View>

                        {/* stats row */}
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={[basic.rawBoldText, styles.statNumber, { color: '#075343' }]}>
                                    {studyHours}
                                </Text>
                                <Text style={[basic.rawText, styles.statLabel]}>
                                    HORAS DE{'\n'}ESTUDIO
                                </Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={[basic.rawBoldText, styles.statNumber, { color: '#6A3F00' }]}>
                                    {finishCourses}
                                </Text>
                                <Text style={[basic.rawText, styles.statLabel]}>
                                    CURSOS{'\n'}FINALIZADOS
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* RIGHT column: two stacked cards */}
                    <View style={[styles.rightColumn, isWide && styles.rightColumnWide]}>
                        {/* Mis Cursos */}
                        <View style={[basic.modal, styles.card, styles.cardFull]}>
                            <View style={styles.cardHeader}>
                                <Text style={[basic.title2, styles.cardTitle]}>Mis Cursos</Text>
                                <TouchableOpacity>
                                    <Text style={styles.seeAll}>Ver todos →</Text>
                                </TouchableOpacity>
                            </View>

                            {MOCK_COURSES.map((course) => {
                                const tc = tagColor(course.tag);
                                return (
                                    <CourseCard
                                        key={course.id}
                                        title={course.title}
                                        category={course.category}
                                        progress={course.progress}
                                        completedLessons={course.completedLessons}
                                        totalLessons={course.totalLessons}
                                        tag={course.tag}
                                        tagBg={tc.bg}
                                        tagText={tc.text}
                                    />
                                );
                            })}
                        </View>

                        {/* Próximas Actividades */}
                        <View style={[basic.modal, styles.card, styles.cardFull]}>
                            <View style={styles.cardHeader}>
                                <Text style={[basic.title2, styles.cardTitle]}>Próximas{'\n'}Actividades</Text>
                            </View>

                            {MOCK_UPCOMING.map((item, index) => (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.upcomingItem,
                                        index < MOCK_UPCOMING.length - 1 && styles.upcomingBorder,
                                    ]}
                                >
                                    <Text style={styles.upcomingIcon}>{upcomingIcon(item.type)}</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[basic.rawMedium, styles.upcomingTitle]}>
                                            {item.title}
                                        </Text>
                                        <Text style={[basic.rawText, styles.upcomingDate]}>
                                            {item.date}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* ── FAB ─────────────────────────────────────── */}
            {!isWide && (
                <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
                    <Text style={styles.fabIcon}>✦</Text>
                </TouchableOpacity>
            )}

            {/* ── BottomNavBar (mobile only) ───────────────── */}
            {!isWide && (
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
            )}
        </SafeAreaView>
    );
}

// ── styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F4F6F5',
    },

    // ── TopAppBar
    topBar: {
        height: 64,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2EBEF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        zIndex: 10,
    },
    topBarWide: {
        paddingHorizontal: 32,
    },
    topBarTitle: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 20,
        color: '#075343',
    },
    topBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#075343',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitial: {
        fontFamily: 'Inter_700Bold',
        color: '#A7E9D3',
        fontSize: 16,
    },

    // ── ScrollView
    scrollContent: {
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    scrollContentWide: {
        paddingHorizontal: 32,
        paddingTop: 32,
    },

    // ── Greeting
    greeting: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginBottom: 6,
    },
    greetingWide: {
        fontSize: 36,
    },
    subGreeting: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingHorizontal: 0,
        marginBottom: 32,
    },
    subGreetingWide: {
        fontSize: 18,
        marginBottom: 40,
    },

    // ── Columns
    columns: {
        flexDirection: 'column',
        gap: 16,
    },
    columnsWide: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 24,
    },

    // ── Cards
    card: {
        padding: 20,
        marginBottom: 0,
    },
    cardHalf: {
        flex: 1,
    },
    cardFull: {
        width: '100%',
    },

    // ── Right column
    rightColumn: {
        flexDirection: 'column',
        gap: 16,
    },
    rightColumnWide: {
        flex: 1,
    },

    // ── Card header
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 8,
    },
    cardTitle: {
        textAlign: 'left',
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
    },

    // ── Career label
    careerLabel: {
        fontSize: 13,
        color: '#3F4945',
        alignSelf: 'flex-start',
        marginBottom: 20,
    },

    // ── Progress circle
    progressCircle: {
        width: 112,
        height: 112,
        borderRadius: 56,
        borderWidth: 6,
        borderColor: '#075343',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    progressPercent: {
        fontFamily: 'Inter_700Bold',
        fontSize: 28,
        color: '#075343',
    },

    // ── Week bar
    weekBarWrapper: {
        width: '100%',
        marginBottom: 24,
    },
    weekBarLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    weekBarLabel: {
        fontSize: 13,
        color: '#3F4945',
    },

    // ── Stats row
    statsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#BFC9C4',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 36,
    },
    statLabel: {
        fontSize: 11,
        color: '#3F4945',
        textAlign: 'center',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statDivider: {
        width: 1,
        height: 48,
        backgroundColor: '#BFC9C4',
    },

    // ── See all
    seeAll: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: '#2A6B5A',
    },

    // ── Upcoming
    upcomingItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        gap: 12,
        width: '100%',
    },
    upcomingBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4F3',
    },
    upcomingIcon: {
        fontSize: 20,
        marginTop: 1,
    },
    upcomingTitle: {
        fontSize: 14,
        color: '#3F4945',
        marginBottom: 2,
    },
    upcomingDate: {
        fontSize: 12,
        color: '#707975',
    },

    // ── Logout
    logoutBtn: {
        marginTop: 32,
        marginBottom: 8,
    },
    logoutText: {
        color: '#075343',
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
    },

    // ── FAB
    fab: {
        position: 'absolute',
        bottom: 88,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: '#075343',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1C2B2A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    fabIcon: {
        color: '#A7E9D3',
        fontSize: 22,
    },

    // ── BottomNavBar
    bottomNav: {
        height: 65,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E2EBEF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        shadowColor: '#1C2B2A',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 8,
    },
    navTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 2,
        opacity: 0.45,
    },
    navIconActive: {
        opacity: 1,
    },
    navLabel: {
        fontSize: 11,
        color: '#707975',
    },
    navLabelActive: {
        color: '#075343',
    },
});