import type { Persistence } from 'firebase/auth'

// firebase/auth exports map has no react-native condition, so TypeScript resolves to browser
// types which omit getReactNativePersistence. Metro picks up the RN variant at runtime.
declare module 'firebase/auth' {
  export function getReactNativePersistence(storage: object): Persistence
}
