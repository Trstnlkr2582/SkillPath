import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius } from '../styles/theme'

type ProfTabName = 'ProfessorDashboard' | 'ProfessorStudentsList' | 'ProfessorAnnouncement' | 'Profile'

interface ProfessorBottomNavBarProps {
  activeTab: ProfTabName
  navigation: any
}

const TABS: { name: ProfTabName; label: string; icon: string }[] = [
  { name: 'ProfessorDashboard', label: 'Inicio', icon: 'home-outline' },
  { name: 'ProfessorStudentsList', label: 'Cursos', icon: 'book-outline' },
  { name: 'ProfessorAnnouncement', label: 'Mensajes', icon: 'chatbubble-outline' },
  { name: 'Profile', label: 'Perfil', icon: 'person-outline' },
]

export default function ProfessorBottomNavBar({ activeTab, navigation }: ProfessorBottomNavBarProps) {
  const { bottom } = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {TABS.map((tab) => {
        const isActive = tab.name === activeTab
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons name={tab.icon as any} size={20} color={isActive ? colors.successText : colors.textMuted} />
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.xs,
    paddingTop: 8,
    minHeight: 56,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    gap: 2,
  },
  itemActive: { backgroundColor: colors.activeBg },
  label: { fontSize: 10, fontWeight: '400', color: colors.textMuted },
  labelActive: { fontWeight: '500', color: colors.successText },
})
