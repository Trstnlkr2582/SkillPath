import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'

type ActionOption = 'archive' | 'draft'

export default function AdminConfirmActionScreen({ navigation }: any) {
  const [selected, setSelected] = useState<ActionOption>('archive')

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" />

      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        onPress={() => navigation.goBack()}
        activeOpacity={1}
      />

      {/* Modal card */}
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Archivar Curso</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Warning message */}
          <Text style={styles.warningText}>
            Estás a punto de archivar el curso{' '}
            <Text style={styles.warningBold}>"Arquitectura de Microservicios Avanzada"</Text>
            . Esta acción lo retirará del catálogo institucional de forma inmediata.
          </Text>

          {/* Impact alert */}
          <View style={styles.impactAlert}>
            <View style={styles.impactHeader}>
              <Ionicons name="warning-outline" size={16} color={colors.accentAmber} />
              <Text style={styles.impactTitle}>Impacto en Estudiantes Activos</Text>
            </View>
            <Text style={styles.impactText}>
              Hay{' '}
              <Text style={styles.impactBold}>1,345 estudiantes</Text>
              {' '}cursando este módulo actualmente. Al archivar, no podrán continuar su progreso pero no se perderán las inscripciones de los estudiantes que se mantendrán intactos.
            </Text>
          </View>

          {/* Radio options */}
          <View style={styles.optionsSection}>
            <TouchableOpacity
              style={[styles.optionRow, selected === 'archive' && styles.optionRowSelected]}
              onPress={() => setSelected('archive')}
              activeOpacity={0.7}
            >
              <View style={[styles.radio, selected === 'archive' && styles.radioSelected]}>
                {selected === 'archive' && <View style={styles.radioDot} />}
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionLabel}>Archivar definitivamente</Text>
                <Text style={styles.optionSub}>
                  Retira el curso al historial académico. Solo visible para administradores.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionRow, selected === 'draft' && styles.optionRowSelected]}
              onPress={() => setSelected('draft')}
              activeOpacity={0.7}
            >
              <View style={[styles.radio, selected === 'draft' && styles.radioSelected]}>
                {selected === 'draft' && <View style={styles.radioDot} />}
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionLabel}>Guardar como borrador</Text>
                <Text style={styles.optionSub}>
                  Permite editar el curso y volver a publicarlo en el futuro sin perder estudiantes.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmBtn, selected === 'archive' && styles.confirmBtnDanger]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('AdminCourses')}
            >
              <Text style={styles.confirmBtnText}>Confirmar Acción</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    gap: spacing.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: { fontSize: fontSize.headingSm, fontWeight: '600', color: colors.textPrimary },
  closeBtn: { padding: spacing.xs },
  warningText: { fontSize: fontSize.body, color: colors.textMuted, lineHeight: 22 },
  warningBold: { fontWeight: '600', color: colors.textPrimary },
  impactAlert: {
    backgroundColor: colors.errorBg,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.danger,
    gap: 6,
  },
  impactHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  impactTitle: { fontSize: fontSize.bodySm, fontWeight: '600', color: colors.dangerText },
  impactText: { fontSize: fontSize.bodySm, color: colors.dangerText, lineHeight: 20 },
  impactBold: { fontWeight: '700' },
  optionsSection: { gap: spacing.sm },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionRowSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  radioSelected: { borderColor: colors.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionInfo: { flex: 1 },
  optionLabel: { fontSize: fontSize.body, fontWeight: '500', color: colors.textPrimary },
  optionSub: { fontSize: fontSize.caption, color: colors.textMuted, lineHeight: 18, marginTop: 2 },
  actionRow: { flexDirection: 'row', gap: spacing.sm, paddingTop: spacing.xs },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: { fontSize: fontSize.body, fontWeight: '500', color: colors.textMuted },
  confirmBtn: {
    flex: 1.5,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnDanger: { backgroundColor: colors.primaryDark },
  confirmBtnText: { fontSize: fontSize.body, fontWeight: '600', color: colors.white },
})
