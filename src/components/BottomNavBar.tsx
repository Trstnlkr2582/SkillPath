import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, radius } from '../styles/theme'

type TabName = 'Dashboard' | 'Catalog' | 'Credentials' | 'Profile'

interface BottomNavBarProps {
  activeTab: TabName
  navigation: any
}

const TABS: { name: TabName; label: string; icon: string }[] = [
  { name: 'Dashboard', label: 'Inicio', icon: 'home-outline' },
  { name: 'Catalog', label: 'Cursos', icon: 'book-outline' },
  { name: 'Credentials', label: 'Logros', icon: 'ribbon-outline' },
  { name: 'Profile', label: 'Perfil', icon: 'person-outline' },
]

export default function BottomNavBar({ activeTab, navigation }: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.name === activeTab
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon as any}
              size={20}
              color={isActive ? colors.successText : colors.textMuted}
            />
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
    paddingHorizontal: spacing.md,
    height: 56,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    gap: 2,
  },
  itemActive: {
    backgroundColor: colors.activeBg,
  },
  label: {
    fontSize: 10,
    fontWeight: '400',
    color: colors.textMuted,
  },
  labelActive: {
    fontWeight: '500',
    color: colors.successText,
  },
})
