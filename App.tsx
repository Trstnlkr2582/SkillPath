import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import './src/config/sentry'
import { AuthProvider } from './src/context/AuthContext'
import { RootStack } from './src/navigation/navigator'

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </AuthProvider>
  )
}

export default Sentry.wrap(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
