import * as Sentry from '@sentry/react-native'

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN

// Siempre inicializar para que Sentry.wrap funcione; enabled:false cuando no hay DSN
Sentry.init({
  dsn: dsn ?? '',
  enabled: !!dsn,
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: 1.0,
  debug: __DEV__ && !!dsn,
})

export default Sentry
