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
  Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'
import AdminBottomNavBar from '../components/AdminBottomNavBar'

const AUDIENCE_OPTIONS = [
  { key: 'all', label: 'Todos los usuarios', desc: 'Estudiantes, profesores y administradores' },
  { key: 'students', label: 'Solo estudiantes', desc: '8,822 destinatarios activos' },
  { key: 'professors', label: 'Solo profesores', desc: '156 destinatarios activos' },
]

type AudienceKey = 'all' | 'students' | 'professors'

export default function AdminAnnouncementScreen({ navigation }: any) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [audience, setAudience] = useState<AudienceKey>('all')
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSend = () => {
    if (!subject.trim() || !body.trim()) {
      Alert.alert('Campos requeridos', 'El asunto y el cuerpo del comunicado son obligatorios.')
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      Alert.alert(
        'Comunicado enviado',
        'El comunicado institucional fue enviado exitosamente a todos los destinatarios.',
        [{ text: 'OK', onPress: () => navigation.navigate('AdminDashboard') }]
      )
    }, 1000)
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.titleSection}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>ADMINISTRADOR</Text>
          </View>
          <Text style={styles.pageTitle}>Comunicado Masivo</Text>
          <Text style={styles.pageSub}>
            Envía un mensaje institucional a toda la comunidad o a un segmento específico.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Audiencia</Text>
          {AUDIENCE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.audienceRow, audience === opt.key && styles.audienceRowActive]}
              onPress={() => setAudience(opt.key as AudienceKey)}
              activeOpacity={0.7}
            >
              <View style={[styles.radio, audience === opt.key && styles.radioActive]}>
                {audience === opt.key && <View style={styles.radioDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.audienceLabel, audience === opt.key && styles.audienceLabelActive]}>
                  {opt.label}
                </Text>
                <Text style={styles.audienceDesc}>{opt.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contenido</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Asunto</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Ej: Actualización del reglamento académico 2025"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mensaje</Text>
            <TextInput
              style={styles.textarea}
              value={body}
              onChangeText={setBody}
              placeholder="Escribe el cuerpo del comunicado aquí..."
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.attachBtn}
            onPress={() => Alert.alert('Adjuntar', 'Selecciona un archivo PDF o imagen.')}
            activeOpacity={0.8}
          >
            <Ionicons name="attach-outline" size={16} color={colors.textMuted} />
            <Text style={styles.attachBtnText}>Adjuntar archivo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Opciones de Envío</Text>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Notificación por email</Text>
              <Text style={styles.toggleSub}>Enviar copia al correo de cada usuario</Text>
            </View>
            <Switch
              value={notifyEmail}
              onValueChange={setNotifyEmail}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Notificación push</Text>
              <Text style={styles.toggleSub}>Enviar alerta en la app móvil</Text>
            </View>
            <Switch
              value={notifyPush}
              onValueChange={setNotifyPush}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Fijar en la plataforma</Text>
              <Text style={styles.toggleSub}>Aparece destacado en el dashboard de todos</Text>
            </View>
            <Switch
              value={pinned}
              onValueChange={setPinned}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.draftBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.draftBtnText}>Guardar Borrador</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sendBtn, sending && styles.sendBtnDisabled]}
            onPress={handleSend}
            activeOpacity={0.85}
            disabled={sending}
          >
            <Ionicons name="send-outline" size={16} color={colors.white} />
            <Text style={styles.sendBtnText}>{sending ? 'Enviando...' : 'Enviar Comunicado'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      <AdminBottomNavBar activeTab="AdminDashboard" navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
  titleSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  adminBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  adminBadgeText: { fontSize: fontSize.caption, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  pageTitle: { fontSize: fontSize.headingMd, fontWeight: '600', color: colors.textPrimary },
  pageSub: { fontSize: fontSize.bodySm, color: colors.textMuted, lineHeight: 20 },
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
  cardTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  audienceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  audienceRowActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  audienceLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  audienceLabelActive: { color: colors.primaryDark, fontWeight: '600' },
  audienceDesc: { fontSize: fontSize.caption, color: colors.textMuted, marginTop: 1 },
  field: { gap: spacing.xs },
  label: { fontSize: fontSize.label, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.3 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 48,
    fontSize: fontSize.body,
    color: colors.textPrimary,
  },
  textarea: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    minHeight: 120,
    lineHeight: 22,
  },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
  },
  attachBtnText: { fontSize: fontSize.bodySm, color: colors.textMuted },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleInfo: { flex: 1, gap: 1 },
  toggleLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  toggleSub: { fontSize: fontSize.caption, color: colors.textMuted },
  actions: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  draftBtn: {
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primaryDark,
  },
  sendBtnDisabled: { opacity: 0.6 },
  sendBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
})
