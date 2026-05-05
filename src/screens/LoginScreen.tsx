import { View, Text } from 'react-native'
import React from 'react'
import { basic } from '../styles/Layouts'

export default function LoginScreen() {
  return (
    <View style={basic.container}>
      <Text style={basic.title1}>SkillPath</Text>
      <Text style={basic.title2}>Tu futuro profesional
empieza aquí.</Text>
    </View>
  )
}