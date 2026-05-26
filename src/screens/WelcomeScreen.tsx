import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, spacing, radius, fontSize } from '../styles/theme'

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Decorative background rings */}
      <View style={styles.outerRing} />
      <View style={styles.innerRing} />

      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            <View style={styles.logoMark} />
          </View>
          <Text style={styles.logoText}>SkillPath</Text>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.heading}>Tu futuro profesional{'\n'}empieza aquí.</Text>
          <Text style={styles.subtitle}>
            Domina nuevas habilidades con rutas de aprendizaje personalizadas y rigor académico de alto nivel.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Comenzar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Trust Badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.badge}>Certificaciones Oficiales</Text>
          <Text style={styles.badge}>Rutas Personalizadas</Text>
          <Text style={styles.badge}>Rigor Académico</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 SkillPath Professional Education. Todos los derechos reservados.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  outerRing: {
    position: 'absolute',
    width: 800,
    height: 800,
    borderRadius: 400,
    borderWidth: 1,
    borderColor: 'rgba(42, 107, 90, 0.08)',
    top: 31,
    left: -205,
  },
  innerRing: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    borderWidth: 1,
    borderColor: 'rgba(42, 107, 90, 0.13)',
    top: 131,
    left: -105,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  logoMark: {
    width: 55,
    height: 45,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.3,
  },
  contentSection: {
    marginTop: 40,
    marginBottom: spacing.xl,
  },
  heading: {
    fontSize: fontSize.headingXl,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 38,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    lineHeight: 26,
  },
  actionSection: {
    gap: 12,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: radius.md,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: fontSize.body,
    fontWeight: '500',
  },
  badgesSection: {
    gap: 14,
    alignItems: 'center',
  },
  badge: {
    fontSize: fontSize.bodySm,
    color: colors.textMuted,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 12,
    paddingTop: spacing.sm,
  },
  footerText: {
    fontSize: fontSize.caption,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 18,
  },
})
