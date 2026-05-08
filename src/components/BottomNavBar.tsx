import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type NavKey = 'Dashboard' | 'Catalogue' | 'progreso' | 'tareas' | 'perfil' | string;

export interface NavItem {
  key:   NavKey;
  label: string;
  icon:  React.ComponentProps<typeof Feather>['name'];
}

export interface BottomNavBarProps {
  activeKey: NavKey;
  // TODO: conectar con React Navigation / Expo Router
  // onPress: (key: NavKey) => void
  onPress: (key: NavKey) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG  (extraído del Figma: 164:1625 — labels confirmados en los TEXT nodes)
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { key: 'Dashboard',   label: 'Inicio',      icon: 'home'         },
  { key: 'Catalogue',   label: 'Cursos',      icon: 'book-open'    },
  { key: 'progreso', label: 'Mi Progreso', icon: 'bar-chart-2'  },
  { key: 'tareas',   label: 'Tareas',      icon: 'check-square' },
  { key: 'perfil',   label: 'Perfil',      icon: 'user'         },
];

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS  (Figma: BottomNavBar 164:1625)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  surface:    '#FFFFFF',
  borderTop:  '#E2E8F0',   // stroke top del contenedor
  active:     '#065F46',   // Figma: HorizontalBorder stroke color
  inactive:   '#949FB8',   // Figma: ícono + texto inactivo
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function BottomNavBar({ activeKey, onPress }: BottomNavBarProps) {
  return (
    <View style={s.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <TouchableOpacity
            key={item.key}
            style={[s.item, isActive && s.itemActive]}
            onPress={() => onPress(item.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={item.label}
          >
            <Feather
              name={item.icon}
              size={20}
              color={isActive ? C.active : C.inactive}
            />
            <Text style={[s.label, isActive && s.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES  (Figma: paddingLeft 27.94, paddingRight 27.99, itemSpacing 39.9)
// ─────────────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  container: {
    flexDirection:   'row',
    justifyContent:  'space-around',
    alignItems:      'center',
    backgroundColor: C.surface,
    borderTopWidth:  1,
    borderTopColor:  C.borderTop,
    paddingHorizontal: 28,
    paddingBottom:   Platform.OS === 'ios' ? 20 : 8,
    height:          Platform.OS === 'ios' ? 84 : 64,  // safe area en iOS
    ...Platform.select({
      ios: {
        shadowColor:   '#1C2B2A',
        shadowOffset:  { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius:  12,
      },
      android: { elevation: 8 },
    }),
  },

  // Ítem inactivo — sin borde superior (Figma: Container sin HorizontalBorder)
  item: {
    alignItems:     'center',
    justifyContent: 'center',
    paddingTop:     4,
    gap:            2,
    minWidth:       48,
    flex:           1,
  },

  // Ítem activo — borde superior 2px (Figma: HorizontalBorder, strokeWeight top: 2)
  itemActive: {
    borderTopWidth: 2,
    borderTopColor: C.active,
    paddingTop:     2,   // compensar el borde para que el contenido no baje
  },

  label: {
    fontSize:   10,
    fontWeight: '500',
    color:      C.inactive,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },

  labelActive: {
    color: C.active,
  },
});