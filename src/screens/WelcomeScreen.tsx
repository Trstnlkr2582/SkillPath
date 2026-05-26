import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius, fontSize } from '../styles/theme'

const TRUST_BADGES = [
  { icon: 'checkmark-circle-outline', label: 'Certificaciones Oficiales' },
  { icon: 'school-outline', label: 'Rigor Académico' },
  { icon: 'trending-up-outline', label: 'Crecimiento Profesional' },
]

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo section */}
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            <Ionicons name="school-outline" size={40} color={colors.primary} />
          </View>
          <Text style={styles.logoText}>SkillPath</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Tu futuro profesional empieza aquí.</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Domina nuevas habilidades con rutas de aprendizaje personalizadas y rigor académico de alto nivel.
        </Text>

        {/* Primary Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Comenzar ahora →</Text>
        </TouchableOpacity>

        {/* Secondary Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Trust Badges */}
        <View style={styles.badgesRow}>
          {TRUST_BADGES.map((badge) => (
            <View key={badge.label} style={styles.badge}>
              <Ionicons name={badge.icon as any} size={14} color={colors.successText} />
              <Text style={styles.badgeText}>{badge.label}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2024 SkillPath Professional Education. Todos los derechos reservados.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 48,
    paddingBottom: spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    height: 52,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 48,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    marginTop: 10,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.body,
    fontWeight: '500',
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 32,
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  footer: {
    fontSize: 11,
    color: colors.placeholder,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 16,
  },
})
