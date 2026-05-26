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

const TIPS = [
  'Sé directo y utiliza un lenguaje claro para evitar confusiones.',
  'Divide los mensajes largos con párrafos o listas de puntos.',
  'Resalta las fechas importantes en negrita para llamar la atención.',
  'Asegúrate de que los adjuntos sean accesibles para todos los dispositivos.',
]

export default function ProfessorAnnouncementScreen({ navigation }: any) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [notifyEmail, setNotifyEmail] = useState(false)
  const [pinAnnouncement, setPinAnnouncement] = useState(false)

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Form card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Nuevo Anuncio Grupal</Text>

          {/* Curso / Cohorte */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Curso / Cohorte</Text>
            <TouchableOpacity style={styles.selectField} activeOpacity={0.7}>
              <Text style={styles.selectText}>Desarrollo Web Full Stack - Cohorte 2024-A</Text>
              <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Asunto */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Asunto</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Ej: Actualización de la fecha de entrega del proyecto"
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>

          {/* Cuerpo */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Cuerpo del anuncio</Text>
            <View style={styles.richTextContainer}>
              <View style={styles.toolbar}>
                {['bold', 'italic', 'list', 'link', 'image'].map((tool) => (
                  <TouchableOpacity key={tool} style={styles.toolBtn} activeOpacity={0.7}>
                    <Ionicons
                      name={tool === 'bold' ? 'text' : tool === 'italic' ? 'text-outline' : tool === 'list' ? 'list-outline' : tool === 'link' ? 'link-outline' : 'image-outline'}
                      size={16}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.bodyInput}
                value={body}
                onChangeText={setBody}
                placeholder="Escribe tu mensaje aquí..."
                placeholderTextColor={colors.placeholder}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* File drop zone */}
          <TouchableOpacity style={styles.dropZone} activeOpacity={0.8} onPress={() => Alert.alert('Adjuntar', 'Selecciona un archivo para adjuntar.')}>
            <Ionicons name="cloud-upload-outline" size={28} color={colors.textMuted} />
            <Text style={styles.dropText}>Arrastra tus archivos aquí o selecciona desde tu equipo</Text>
            <Text style={styles.dropSub}>PDF, DOCÚ, ZIP (Máx. 10MB)</Text>
          </TouchableOpacity>

          {/* Checkboxes */}
          <TouchableOpacity style={styles.checkRow} onPress={() => setNotifyEmail(!notifyEmail)} activeOpacity={0.7}>
            <View style={[styles.checkbox, notifyEmail && styles.checkboxActive]}>
              {notifyEmail && <Ionicons name="checkmark" size={10} color={colors.white} />}
            </View>
            <Text style={styles.checkLabel}>Enviar notificación por email a todos los estudiantes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkRow} onPress={() => setPinAnnouncement(!pinAnnouncement)} activeOpacity={0.7}>
            <View style={[styles.checkbox, pinAnnouncement && styles.checkboxActive]}>
              {pinAnnouncement && <Ionicons name="checkmark" size={10} color={colors.white} />}
            </View>
            <Text style={styles.checkLabel}>Fijar anuncio al inicio del curso</Text>
          </TouchableOpacity>

          {/* Buttons */}
          <TouchableOpacity style={styles.draftBtn} activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Text style={styles.draftBtnText}>Guardar Borrador</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.publishBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ProfessorDashboard')}
          >
            <Text style={styles.publishBtnText}>Publicar Anuncio</Text>
          </TouchableOpacity>
        </View>

        {/* Tips card */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb-outline" size={16} color={colors.successText} />
            <Text style={styles.tipsTitle}>Consejos rápidos</Text>
          </View>
          {TIPS.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="checkmark-circle-outline" size={14} color={colors.successText} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Course preview */}
        <View style={styles.coursePreview}>
          <View style={styles.coursePreviewBadge}>
            <Text style={styles.coursePreviewBadgeText}>Activo</Text>
          </View>
          <Text style={styles.coursePreviewTitle}>Desarrollo Web Full Stack</Text>
          <Text style={styles.coursePreviewSub}>148 Estudiantes · 12 Sesiones pendientes</Text>
        </View>

        <View style={{ height: spacing.lg }} />
      </ScrollView>

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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuBtn: { padding: spacing.xs, gap: 4 },
  menuLine: { width: 20, height: 2, borderRadius: 1, backgroundColor: colors.textPrimary },
  brand: { fontSize: 18, fontWeight: '700', color: colors.primary },
  avatarBox: { width: 34, height: 34, borderRadius: 8, backgroundColor: colors.accentAmber, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '700', color: colors.white },
  scroll: { flex: 1 },
  formCard: {
    margin: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  formTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  field: { gap: spacing.xs },
  fieldLabel: { fontSize: fontSize.label, fontWeight: '500', color: colors.textMuted },
  selectField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  selectText: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 48,
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  input: { fontSize: fontSize.body, color: colors.textPrimary },
  richTextContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  toolbar: {
    flexDirection: 'row',
    gap: 4,
    padding: 8,
    backgroundColor: colors.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toolBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyInput: {
    minHeight: 120,
    padding: 12,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    lineHeight: 22,
    backgroundColor: colors.white,
  },
  dropZone: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
  },
  dropText: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  dropSub: { fontSize: 11, color: colors.placeholder },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkLabel: { flex: 1, fontSize: fontSize.body, color: colors.textPrimary, lineHeight: 20 },
  draftBtn: {
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  publishBtn: {
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
  tipsCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 8,
  },
  tipsHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tipsTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.successText },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  tipText: { flex: 1, fontSize: fontSize.bodySm, color: colors.textPrimary, lineHeight: 18 },
  coursePreview: {
    margin: spacing.md,
    height: 100,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.md,
    justifyContent: 'flex-end',
    gap: 4,
  },
  coursePreviewBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.activeBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 4,
  },
  coursePreviewBadgeText: { fontSize: 11, fontWeight: '600', color: colors.successText },
  coursePreviewTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.white },
  coursePreviewSub: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
})
