import { initializeApp, getApps } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Firebase web config — obténla en Firebase Console → Project Settings → General → Your apps
const firebaseConfig = {
  apiKey: 'AIzaSyD-REPLACE_WITH_YOUR_API_KEY',
  authDomain: 'skill-path-data-base.firebaseapp.com',
  projectId: 'skill-path-data-base',
  storageBucket: 'skill-path-data-base.firebasestorage.app',
  messagingSenderId: 'REPLACE_WITH_MESSAGING_SENDER_ID',
  appId: 'REPLACE_WITH_APP_ID',
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export default app
