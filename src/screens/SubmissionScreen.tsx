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
import BottomNavBar from '../components/BottomNavBar'

const RUBRIC = [
  { label: 'Concepto Visual', desc: 'Creatividad y coherencia de marca', pts: 40 },
  { label: 'Usabilidad (Uú)', desc: 'Flujos y facilidad de navegación', pts: 40 },
  { label: 'Prototipado', desc: 'Interacciones y fidelidad', pts: 20 },
]

export default function SubmissionScreen({ navigation }: any) {
  const [links, setLinks] = useState('')
  const [comments, setComments] = useState('')
  const [fileAttached, setFileAttached] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Achievement banner */}
        <View style={styles.achieveBanner}>
          <View style={styles.achieveIconBox}>
            <Ionicons name="ribbon-outline" size={18} color={colors.successText} />
          </View>
          <Text style={styles.achieveText}>
            ¡Casi terminas! Obtén tu insignia de{' '}
            <Text style={{ fontWeight: '600' }}>Diseñador Junior</Text>
          </Text>
        </View>

        <View style={styles.content}>
          {/* Assignment title + desc */}
          <Text style={styles.assignTitle}>Entrega: Proyecto Final de Diseño</Text>
          <Text style={styles.assignDesc}>
            Sube tu propuesta final en formato PDF. Asegúrate de incluir los enlaces correspondientes a tus prototipos interactivos de Figma o Adobe XD para la evaluación de usabilidad.
          </Text>

          {/* Drop zone */}
          <TouchableOpacity
            style={[styles.dropZone, fileAttached && styles.dropZoneAttached]}
            onPress={() => setFileAttached(!fileAttached)}
            activeOpacity={0.8}
          >
            {fileAttached ? (
              <>
                <Ionicons name="document-text" size={28} color={colors.primary} />
                <Text style={styles.dropAttachedTitle}>propuesta_final.pdf</Text>
                <Text style={styles.dropAttachedSub}>3.2 MB · Toca para cambiar</Text>
              </>
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={32} color={colors.textMuted} />
                <Text style={styles.dropTitle}>Arrastra tu archivo PDF aquí</Text>
                <Text style={styles.dropSub}>O haz clic para seleccionar archivos (Máx 50MB)</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Links */}
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

          {/* Comments */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Comentarios para el instructor</Text>
            <TextInput
              style={styles.textarea}
              value={comments}
              onChangeText={setComments}
              placeholder="Escribe aquí cualquier observación relevante sobre tu entrega..."
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Action buttons */}
          <TouchableOpacity
            style={[styles.submitBtn, !fileAttached && styles.submitBtnDisabled]}
            activeOpacity={0.85}
            disabled={!fileAttached}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.submitBtnText}>Enviar tarea</Text>
          </TouchableOpacity>

          <View style={styles.secondaryBtns}>
            <TouchableOpacity style={styles.draftBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Text style={styles.draftBtnText}>Guardar Borrador</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          {/* Rubric */}
          <View style={styles.rubricCard}>
            <Text style={styles.rubricTitle}>Rúbrica de calificación</Text>
            <View style={styles.divider} />
            {RUBRIC.map((item, i) => (
              <View key={i}>
                <View style={styles.rubricRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rubricLabel}>{item.label}</Text>
                    <Text style={styles.rubricDesc}>{item.desc}</Text>
                  </View>
                  <Text style={styles.rubricPts}>{item.pts} <Text style={styles.rubricPtsLabel}>pts</Text></Text>
                </View>
                <View style={styles.divider} />
              </View>
            ))}
            <View style={styles.rubricRow}>
              <View style={styles.rubricTrack}>
                <View style={{ width: '0%', height: '100%', backgroundColor: colors.primary, borderRadius: 4 }} />
              </View>
              <Text style={styles.rubricTotal}>0/100 pts</Text>
            </View>
          </View>

          {/* Achievement card */}
          <View style={styles.credentialCard}>
            <View style={styles.credentialIcon}>
              <Ionicons name="ribbon" size={22} color={colors.accentViolet} />
            </View>
            <View>
              <Text style={styles.credentialTitle}>Diseñador Junior</Text>
              <Text style={styles.credentialSub}>Certificación oficial</Text>
            </View>
          </View>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

      <BottomNavBar activeTab="Submission" navigation={navigation} />
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
  achieveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: spacing.md,
    backgroundColor: colors.activeBg,
    borderRadius: radius.lg,
    padding: 14,
  },
  achieveIconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achieveText: { flex: 1, fontSize: 13, color: colors.successText, lineHeight: 18 },
  content: { paddingHorizontal: spacing.md, gap: spacing.md },
  assignTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  assignDesc: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22 },
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
  dropTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted, textAlign: 'center' },
  dropSub: { fontSize: 12, color: colors.placeholder, textAlign: 'center' },
  dropAttachedTitle: { fontSize: fontSize.body, fontWeight: '500', color: colors.primary },
  dropAttachedSub: { fontSize: fontSize.caption, color: colors.textMuted },
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
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { backgroundColor: colors.border },
  submitBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  secondaryBtns: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  draftBtn: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  cancelText: { fontSize: fontSize.body, color: colors.textMuted, fontWeight: '500' },
  rubricCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  rubricTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  rubricRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingVertical: 6 },
  rubricLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  rubricDesc: { fontSize: 12, color: colors.textMuted, marginTop: 1 },
  rubricPts: { fontSize: fontSize.headingSm, fontWeight: '700', color: colors.primary },
  rubricPtsLabel: { fontSize: fontSize.caption, fontWeight: '400', color: colors.textMuted },
  rubricTrack: { flex: 1, height: 6, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden', marginTop: 6 },
  rubricTotal: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  credentialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.credentialBg,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  credentialIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(107,92,184,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  credentialTitle: { fontSize: 14, fontWeight: '600', color: colors.accentViolet },
  credentialSub: { fontSize: 12, color: colors.textMuted },
})
