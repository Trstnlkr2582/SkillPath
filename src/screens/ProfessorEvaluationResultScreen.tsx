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
import ProfessorBottomNavBar from '../components/ProfessorBottomNavBar'

export default function ProfessorEvaluationResultScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SkillPath</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DR</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Success banner */}
        <View style={styles.successBanner}>
          <View style={styles.successIconBox}>
            <Ionicons name="checkmark-circle" size={32} color={colors.activeText} />
          </View>
          <Text style={styles.successTitle}>Calificación Enviada</Text>
          <Text style={styles.successSub}>
            El estudiante ha sido notificado exitosamente por correo electrónico y plataforma.
          </Text>
        </View>

        {/* Summary card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>RESUMEN DE LA EVALUACIÓN</Text>

          <View style={styles.studentRow}>
            <View style={styles.studentAvatar}>
              <Text style={styles.studentAvatarText}>AM</Text>
            </View>
            <View>
              <Text style={styles.studentLabel}>Estudiante</Text>
              <Text style={styles.studentName}>Alejandro Morales</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>Nota Final</Text>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeValue}>9.5</Text>
              <View style={styles.gradePill}>
                <Text style={styles.gradePillText}>Sobresaliente</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackLabel}>Feedback proporcionado</Text>
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>
                "Excelente análisis crítico del caso de estudio. La estructura del argumento es sólida y demuestra un dominio profundo de los conceptos técnicos aplicados."
              </Text>
            </View>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>85% de las tareas del curso calificadas</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '85%' }]} />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('ProfessorReview')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Continuar calificando</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate('ProfessorDashboard')}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryBtnText}>Volver al Tablero</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <ProfessorBottomNavBar activeTab="ProfessorDashboard" navigation={navigation} />
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
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerBtn: { padding: spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.avatarText },
  scroll: { flex: 1 },
  successBanner: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    gap: spacing.sm,
  },
  successIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.activeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  successSub: { fontSize: fontSize.body, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTitle: { fontSize: fontSize.caption, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5 },
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentAvatarText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.avatarText },
  studentLabel: { fontSize: fontSize.caption, color: colors.textMuted },
  studentName: { fontSize: fontSize.body, fontWeight: '600', color: colors.textPrimary },
  divider: { height: 1, backgroundColor: colors.border },
  gradeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gradeLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  gradeBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  gradeValue: { fontSize: fontSize.headingMd, fontWeight: '700', color: colors.textPrimary },
  gradePill: {
    backgroundColor: colors.activeBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  gradePillText: { fontSize: fontSize.caption, fontWeight: '600', color: colors.activeText },
  feedbackSection: { gap: spacing.xs },
  feedbackLabel: { fontSize: fontSize.label, fontWeight: '600', color: colors.textMuted },
  feedbackBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  feedbackText: { fontSize: fontSize.bodySm, color: colors.textPrimary, lineHeight: 22, fontStyle: 'italic' },
  progressCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  progressTrack: { height: 8, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  actionsCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  secondaryBtn: {
    borderRadius: radius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  secondaryBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
})
