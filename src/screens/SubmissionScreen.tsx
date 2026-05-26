import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'

const RUBRIC_ITEMS = [
  { label: 'Diseño visual e identidad', score: '30', max: '30' },
  { label: 'Usabilidad y flujos de usuario', score: '25', max: '25' },
  { label: 'Prototipo interactivo', score: '30', max: '30' },
  { label: 'Documentación técnica', score: '15', max: '15' },
]

export default function SubmissionScreen({ navigation }: any) {
  const [links, setLinks] = useState('')
  const [comments, setComments] = useState('')
  const [fileAttached, setFileAttached] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Entregar tarea</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Info alert */}
        <View style={styles.infoAlert}>
          <Ionicons name="information-circle" size={18} color={colors.primary} style={{ marginTop: 2 }} />
          <Text style={styles.alertText}>
            Fecha límite:{' '}
            <Text style={styles.alertBold}>Viernes 23 de mayo · 11:59 PM</Text>
          </Text>
        </View>

        {/* Left column: assignment details */}
        <View style={styles.section}>
          <Text style={styles.assignmentTitle}>Entrega: Proyecto Final de Diseño</Text>
          <Text style={styles.assignmentDesc}>
            Sube tu propuesta final en formato PDF. Asegúrate de incluir los enlaces correspondientes
            a tus prototipos interactivos de Figma o Adobe XD para la evaluación de usabilidad.
          </Text>

          {/* Drop Zone */}
          <TouchableOpacity
            style={[styles.dropZone, fileAttached && styles.dropZoneAttached]}
            onPress={() => setFileAttached(!fileAttached)}
            activeOpacity={0.8}
          >
            {fileAttached ? (
              <>
                <Ionicons name="document-text" size={28} color={colors.primary} />
                <Text style={styles.dropZoneAttachedTitle}>propuesta_final.pdf</Text>
                <Text style={styles.dropZoneAttachedSub}>3.2 MB · Toca para cambiar</Text>
              </>
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={32} color={colors.textMuted} />
                <Text style={styles.dropZoneTitle}>Arrastra tu archivo aquí</Text>
                <Text style={styles.dropZoneSub}>PDF, máx. 10 MB</Text>
                <View style={styles.browseBtn}>
                  <Text style={styles.browseBtnText}>Buscar archivo</Text>
                </View>
              </>
            )}
          </TouchableOpacity>

          {/* Links input */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Enlaces a prototipos</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={links}
                onChangeText={setLinks}
                placeholder="https://figma.com/file/..."
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Comments textarea */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Comentarios para el instructor</Text>
            <TextInput
              style={styles.textarea}
              value={comments}
              onChangeText={setComments}
              placeholder="Describe las decisiones de diseño más importantes..."
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Action buttons */}
          <View style={styles.actionBtns}>
            <TouchableOpacity style={styles.draftBtn} activeOpacity={0.7}>
              <Text style={styles.draftBtnText}>Guardar borrador</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitBtn, !fileAttached && styles.submitBtnDisabled]}
              activeOpacity={0.85}
              disabled={!fileAttached}
            >
              <Text style={styles.submitBtnText}>Enviar entrega</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rubric card */}
        <View style={styles.rubricCard}>
          <Text style={styles.rubricTitle}>Rúbrica de calificación</Text>
          <View style={styles.divider} />
          {RUBRIC_ITEMS.map((item, idx) => (
            <View key={idx}>
              <View style={styles.rubricRow}>
                <Text style={styles.rubricLabel}>{item.label}</Text>
                <Text style={styles.rubricScore}>
                  <Text style={styles.rubricScoreValue}>{item.score}</Text>
                  <Text style={styles.rubricScoreMax}>/{item.max} pts</Text>
                </Text>
              </View>
              {idx < RUBRIC_ITEMS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.rubricTotal}>
            <Text style={styles.rubricTotalLabel}>Total</Text>
            <Text style={styles.rubricTotalValue}>100 pts</Text>
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
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
  backBtn: { padding: spacing.xs },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  scroll: { flex: 1 },
  infoAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    margin: spacing.md,
    padding: spacing.sm + 2,
    backgroundColor: colors.primaryLight,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: radius.sm,
  },
  alertText: { flex: 1, fontSize: fontSize.bodySm, color: colors.primaryDark, lineHeight: 20 },
  alertBold: { fontWeight: '600' },
  section: { paddingHorizontal: spacing.md, gap: spacing.md },
  assignmentTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  assignmentDesc: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22 },
  dropZone: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },
  dropZoneAttached: { borderColor: colors.primary, borderStyle: 'solid', backgroundColor: colors.primaryLight },
  dropZoneTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  dropZoneSub: { fontSize: fontSize.caption, color: colors.placeholder },
  dropZoneAttachedTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.primary },
  dropZoneAttachedSub: { fontSize: fontSize.caption, color: colors.textMuted },
  browseBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    marginTop: spacing.xs,
  },
  browseBtnText: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.white },
  field: { gap: spacing.xs },
  fieldLabel: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 48,
  },
  input: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  textarea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    minHeight: 96,
    lineHeight: 22,
  },
  actionBtns: { flexDirection: 'row', gap: spacing.sm },
  draftBtn: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  submitBtn: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { backgroundColor: colors.surface },
  submitBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  rubricCard: {
    margin: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  rubricTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  rubricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  rubricLabel: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  rubricScore: {},
  rubricScoreValue: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.primary },
  rubricScoreMax: { fontSize: fontSize.bodySm, color: colors.textMuted },
  rubricTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  rubricTotalLabel: { fontSize: fontSize.body, fontWeight: '600', color: colors.textPrimary },
  rubricTotalValue: { fontSize: fontSize.headingSm, fontWeight: '700', color: colors.primary },
})
