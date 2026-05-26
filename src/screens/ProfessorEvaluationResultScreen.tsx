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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Success icon */}
        <View style={styles.successIconBox}>
          <Ionicons name="checkmark" size={36} color={colors.successText} />
        </View>

        <Text style={styles.successTitle}>Calificación Enviada</Text>
        <Text style={styles.successDesc}>
          El estudiante ha sido notificado exitosamente por correo electrónico y plataforma.
        </Text>

        {/* Summary card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>RESUMEN DE LA EVALUACIÓN</Text>

          <Text style={styles.fieldLabel}>Estudiante</Text>
          <View style={styles.studentRow}>
            <View style={styles.studentAvatar}>
              <Text style={styles.studentAvatarText}>AM</Text>
            </View>
            <Text style={styles.studentName}>Alejandro Morales</Text>
          </View>

          <Text style={styles.fieldLabel}>Nota Final</Text>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeValue}>9.5</Text>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeBadgeText}>Sobresaliente</Text>
            </View>
          </View>

          <Text style={styles.fieldLabel}>Feedback proporcionado</Text>
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>
              "Excelente análisis crítico del caso de estudio. La estructura del argumento es sólida y demuestra un dominio profundo de los conceptos teóricos aplicados."
            </Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Continuar calificando</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('ProfessorDashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>Volver al Tablero</Text>
        </TouchableOpacity>

        {/* Progress footer */}
        <View style={styles.progressFooter}>
          <Ionicons name="trending-up-outline" size={14} color={colors.successText} />
          <Text style={styles.progressFooterText}>85% de las tareas del curso calificadas</Text>
          <View style={styles.progressFooterTrack}>
            <View style={[styles.progressFooterFill, { width: '85%' }]} />
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('ProfessorStudentsList')}>
        <Ionicons name="people-outline" size={22} color={colors.white} />
      </TouchableOpacity>

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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuBtn: { padding: spacing.xs, gap: 4 },
  menuLine: { width: 20, height: 2, borderRadius: 1, backgroundColor: colors.textPrimary },
  brand: { fontSize: 18, fontWeight: '700', color: colors.primary },
  avatarBox: { width: 34, height: 34, borderRadius: 8, backgroundColor: colors.accentAmber, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '700', color: colors.white },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.md, alignItems: 'center', gap: 12 },
  successIconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: colors.activeBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  successTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary, textAlign: 'center' },
  successDesc: { fontSize: fontSize.body, color: colors.textMuted, textAlign: 'center', lineHeight: 22, paddingHorizontal: spacing.md },
  summaryCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 10,
  },
  summaryLabel: { fontSize: 11, fontWeight: '700', color: colors.successText, letterSpacing: 0.5 },
  fieldLabel: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  studentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentAvatarText: { fontSize: 11, fontWeight: '700', color: colors.white },
  studentName: { fontSize: fontSize.body, fontWeight: '600', color: colors.textPrimary },
  gradeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  gradeValue: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  gradeBadge: {
    backgroundColor: colors.credentialBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  gradeBadgeText: { fontSize: 12, fontWeight: '500', color: colors.accentViolet },
  feedbackBox: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  feedbackText: { fontSize: 13, color: colors.textMuted, lineHeight: 20, fontStyle: 'italic' },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  secondaryBtn: {
    width: '100%',
    borderRadius: radius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  secondaryBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  progressFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: spacing.sm,
  },
  progressFooterText: { fontSize: 12, color: colors.textMuted },
  progressFooterTrack: { flex: 1, height: 4, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFooterFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  fab: {
    position: 'absolute',
    bottom: 76,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentAmber,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
})
