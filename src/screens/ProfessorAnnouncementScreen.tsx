import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import ProfessorBottomNavBar from '../components/ProfessorBottomNavBar'

const NOTIFY_OPTIONS = [
  { label: 'Enviar notificación por email a todos los estudiantes', key: 'email' },
  { label: 'Fijar anuncio al inicio del curso', key: 'pin' },
]

export default function ProfessorAnnouncementScreen({ navigation }: any) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [fileAttached, setFileAttached] = useState(false)
  const [notifyChecked, setNotifyChecked] = useState<Record<string, boolean>>({ email: true, pin: false })

  const toggleNotify = (key: string) =>
    setNotifyChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Nuevo Anuncio Grupal</Text>
        </View>

        <View style={styles.card}>
          {/* Course selector */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Curso / Cohorte</Text>
            <TouchableOpacity style={styles.selectWrapper} activeOpacity={0.7}>
              <Text style={styles.selectText}>Desarrollo Web Full Stack – Cohorte, 2024-A</Text>
              <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Subject */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Asunto</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Ej. Actualización de la fecha de entrega del proyecto."
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>

          {/* Body */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Cuerpo del anuncio</Text>
            {/* Toolbar */}
            <View style={styles.editorToolbar}>
              {['B', 'I', '≡', '•', '🔗', '📷'].map((tool, i) => (
                <TouchableOpacity key={i} style={styles.toolBtn}>
                  <Text style={styles.toolBtnText}>{tool}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.textarea}
              value={body}
              onChangeText={setBody}
              placeholder="Escribe tu mensaje aquí..."
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* File attachment */}
          <TouchableOpacity
            style={[styles.dropZone, fileAttached && styles.dropZoneAttached]}
            onPress={() => setFileAttached(!fileAttached)}
            activeOpacity={0.8}
          >
            {fileAttached ? (
              <>
                <Ionicons name="document-text" size={22} color={colors.primary} />
                <Text style={styles.dropZoneAttachedTitle}>archivo_adjunto.pdf</Text>
              </>
            ) : (
              <>
                <Ionicons name="attach-outline" size={22} color={colors.textMuted} />
                <Text style={styles.dropZoneTitle}>Arrastra tus archivos aquí o selecciona desde tu equipo</Text>
                <Text style={styles.dropZoneSub}>PDF, DOCX, ZIP (Máx. 10MB)</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Notify options */}
          <View style={styles.notifySection}>
            {NOTIFY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={styles.notifyRow}
                onPress={() => toggleNotify(opt.key)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, notifyChecked[opt.key] && styles.checkboxActive]}>
                  {notifyChecked[opt.key] && (
                    <Ionicons name="checkmark" size={10} color={colors.white} />
                  )}
                </View>
                <Text style={styles.notifyLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="location-outline" size={14} color={colors.primary} />
            <Text style={styles.tipsTitle}>Consejos rápidos</Text>
          </View>
          {[
            'Sé directo y utiliza un lenguaje claro para evitar confusiones.',
            'Divide los mensajes largos con párrafos o listas de puntos.',
            'Resalta las fechas importantes en negrita para llamar la atención.',
            'Asegúrate de que los adjuntos sean accesibles para todos los dispositivos.',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="checkmark-circle-outline" size={14} color={colors.primary} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Course preview */}
        <View style={styles.coursePreview}>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>ACTIVO</Text>
          </View>
          <View style={styles.courseThumbnail} />
          <View style={styles.coursePreviewInfo}>
            <Text style={styles.coursePreviewTitle}>Desarrollo Web Full Stack</Text>
            <Text style={styles.coursePreviewSub}>148 Estudiantes • 12 Sesiones pendientes</Text>
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Footer actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.draftBtn} activeOpacity={0.7}>
          <Text style={styles.draftBtnText}>Guardar Borrador</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.publishBtn, !subject && styles.publishBtnDisabled]}
          disabled={!subject}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.publishBtnText}>Publicar Anuncio</Text>
        </TouchableOpacity>
      </View>

      <ProfessorBottomNavBar activeTab="ProfessorAnnouncement" navigation={navigation} />
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
  titleSection: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xs },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  field: { gap: spacing.xs },
  fieldLabel: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 48,
  },
  selectText: { flex: 1, fontSize: fontSize.bodySm, color: colors.textPrimary, marginRight: 4 },
  inputWrapper: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 48,
    justifyContent: 'center',
  },
  input: { fontSize: fontSize.body, color: colors.textPrimary },
  editorToolbar: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 4,
    paddingVertical: 6,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 0,
  },
  toolBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBtnText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  textarea: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 0,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    padding: 12,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    minHeight: 120,
    lineHeight: 22,
  },
  dropZone: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
  },
  dropZoneAttached: { borderColor: colors.primary, borderStyle: 'solid', backgroundColor: colors.primaryLight },
  dropZoneTitle: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.textMuted, textAlign: 'center' },
  dropZoneSub: { fontSize: fontSize.caption, color: colors.placeholder },
  dropZoneAttachedTitle: { fontSize: fontSize.bodySm, fontWeight: '500', color: colors.primary },
  notifySection: { gap: spacing.xs },
  notifyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  notifyLabel: { flex: 1, fontSize: fontSize.bodySm, color: colors.textPrimary, lineHeight: 20 },
  tipsCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  tipsHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: 4 },
  tipsTitle: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.primary },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs },
  tipText: { flex: 1, fontSize: fontSize.caption, color: colors.textMuted, lineHeight: 18 },
  coursePreview: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  activeBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    zIndex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  activeBadgeText: { fontSize: fontSize.caption, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  courseThumbnail: { height: 90, backgroundColor: colors.primaryDark },
  coursePreviewInfo: { backgroundColor: colors.white, padding: spacing.sm },
  coursePreviewTitle: { fontSize: fontSize.body, fontWeight: '600', color: colors.textPrimary },
  coursePreviewSub: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 2 },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  draftBtn: {
    flex: 1,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  publishBtn: {
    flex: 1.5,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishBtnDisabled: { backgroundColor: colors.border },
  publishBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
})
