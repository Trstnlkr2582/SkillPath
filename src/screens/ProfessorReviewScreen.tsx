import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import ProfessorBottomNavBar from '../components/ProfessorBottomNavBar'

const RUBRIC = [
  { label: 'Comprensión Técnica', score: 5, max: 10, color: colors.danger },
  { label: 'Metodología', score: 10, max: 10, color: colors.primary },
  { label: 'Presentación', score: 7, max: 10, color: colors.accentAmber },
]

export default function ProfessorReviewScreen({ navigation }: any) {
  const [rubricScores, setRubricScores] = useState(RUBRIC.map((r) => r.score))
  const [feedback, setFeedback] = useState('')

  const total = rubricScores.reduce((a, b) => a + b, 0)
  const maxTotal = RUBRIC.reduce((a, r) => a + r.max, 0)

  const updateScore = (index: number, delta: number) => {
    setRubricScores((prev) =>
      prev.map((s, i) => (i === index ? Math.min(RUBRIC[i].max, Math.max(0, s + delta)) : s))
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Back link */}
        <TouchableOpacity
          style={styles.backLink}
          onPress={() => navigation.navigate('ProfessorDashboard')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={14} color={colors.primary} />
          <Text style={styles.backLinkText}>VOLVER A LA LISTA</Text>
        </TouchableOpacity>

        {/* Assignment info */}
        <View style={styles.assignmentHeader}>
          <Text style={styles.assignmentTitle}>Módulo 4: Análisis Estructural Avanzado</Text>
          <View style={styles.metaRow}>
            <View style={styles.studentMeta}>
              <Ionicons name="person-circle-outline" size={16} color={colors.textMuted} />
              <Text style={styles.metaText}>Estudiante: Carlos Méndez</Text>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>Premium</Text>
              </View>
            </View>
          </View>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={12} color={colors.textMuted} />
            <Text style={styles.dateText}>Entregado: 22 May, 2024</Text>
            <View style={styles.revisionBadge}>
              <Text style={styles.revisionBadgeText}>EN REVISIÓN</Text>
            </View>
          </View>
        </View>

        {/* File attachment */}
        <View style={styles.fileCard}>
          <View style={styles.fileIcon}>
            <Ionicons name="document-text-outline" size={20} color={colors.primary} />
          </View>
          <Text style={styles.fileName}>Proyecto_Final_v2.pdf</Text>
          <View style={styles.fileActions}>
            <TouchableOpacity style={styles.fileActionBtn} onPress={() => Alert.alert('Vista previa', 'Abriendo vista previa del documento...')}>
              <Ionicons name="search-outline" size={16} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fileActionBtn} onPress={() => Alert.alert('Descargar', 'Descargando Proyecto_Final_v2.pdf...')}>
              <Ionicons name="download-outline" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* PDF preview placeholder */}
        <View style={styles.pdfPreview}>
          <View style={styles.pdfLines}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={[styles.pdfLine, i % 3 === 0 && { width: '60%' }]} />
            ))}
          </View>
          <View style={styles.pdfFooter}>
            <Ionicons name="expand-outline" size={16} color={colors.textMuted} />
          </View>
        </View>

        {/* Rubric */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rúbrica de Evaluación</Text>
          {RUBRIC.map((item, i) => (
            <View key={i} style={styles.rubricItem}>
              <View style={styles.rubricLabelRow}>
                <Text style={styles.rubricLabel}>{item.label}</Text>
                <View style={styles.rubricScoreControl}>
                  <TouchableOpacity style={styles.scoreBtn} onPress={() => updateScore(i, -1)}>
                    <Ionicons name="remove" size={14} color={colors.textMuted} />
                  </TouchableOpacity>
                  <Text style={styles.scoreText}>
                    <Text style={{ color: item.color, fontWeight: '700' }}>{rubricScores[i]}</Text>
                    <Text style={styles.scoreMax}>/{item.max}</Text>
                  </Text>
                  <TouchableOpacity style={styles.scoreBtn} onPress={() => updateScore(i, 1)}>
                    <Ionicons name="add" size={14} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rubricTrack}>
                <View style={[
                  styles.rubricFill,
                  { width: `${(rubricScores[i] / item.max) * 100}%` as any, backgroundColor: item.color },
                ]} />
              </View>
            </View>
          ))}
        </View>

        {/* Feedback */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Comentarios de Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Escribe tus observaciones para el estudiante..."
            placeholderTextColor={colors.placeholder}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Final grade */}
        <View style={styles.finalGradeCard}>
          <Text style={styles.finalGradeLabel}>Calificación Final</Text>
          <Text style={styles.finalGradeValue}>
            <Text style={styles.finalGradeScore}>{total}</Text>
            <Text style={styles.finalGradeMax}>/{maxTotal}</Text>
          </Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.draftBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Text style={styles.draftBtnText}>GUARDAR BORRADOR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => navigation.navigate('ProfessorEvaluationResult')}
          activeOpacity={0.85}
        >
          <Ionicons name="send-outline" size={14} color={colors.white} />
          <Text style={styles.submitBtnText}>ENVIAR CALIFICACIÓN</Text>
        </TouchableOpacity>
      </View>

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
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  backLinkText: { fontSize: fontSize.caption, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  assignmentHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    gap: 4,
  },
  assignmentTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  studentMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  premiumBadge: {
    backgroundColor: colors.accentAmber,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
    marginLeft: 4,
  },
  premiumBadgeText: { fontSize: 9, fontWeight: '700', color: colors.white },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dateText: { fontSize: fontSize.caption, color: colors.textMuted },
  revisionBadge: {
    backgroundColor: colors.progressBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginLeft: 4,
  },
  revisionBadgeText: { fontSize: 9, fontWeight: '700', color: colors.progressText, letterSpacing: 0.4 },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  fileIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: { flex: 1, fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textPrimary },
  fileActions: { flexDirection: 'row', gap: 4 },
  fileActionBtn: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfPreview: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  pdfLines: { gap: 8 },
  pdfLine: { height: 8, backgroundColor: colors.border, borderRadius: 4, width: '90%' },
  pdfFooter: { alignItems: 'flex-end', marginTop: spacing.sm },
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
  cardTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  rubricItem: { gap: 6 },
  rubricLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rubricLabel: { fontSize: fontSize.body, color: colors.textPrimary },
  rubricScoreControl: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  scoreBtn: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  scoreText: { minWidth: 36, textAlign: 'center', fontSize: fontSize.bodySm },
  scoreMax: { fontSize: fontSize.caption, color: colors.textMuted },
  rubricTrack: { height: 6, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  rubricFill: { height: '100%', borderRadius: 4 },
  feedbackInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    minHeight: 96,
    lineHeight: 22,
  },
  finalGradeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: spacing.md,
  },
  finalGradeLabel: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.primary },
  finalGradeValue: {},
  finalGradeScore: { fontSize: fontSize.headingLg, fontWeight: '700', color: colors.primaryDark },
  finalGradeMax: { fontSize: fontSize.body, color: colors.textMuted },
  footer: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  draftBtn: {
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftBtnText: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.5 },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  submitBtnText: { fontSize: fontSize.bodySm, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
})
