import * as Sentry from '@sentry/react-native'
import api from './api'

type EventName =
  | 'login'
  | 'register'
  | 'logout'
  | 'view_screen'
  | 'enroll_course'
  | 'complete_lesson'
  | 'submit_task'
  | 'view_credential'
  | 'complete_onboarding'

type EventProperties = Record<string, string | number | boolean | undefined>

const track = async (event: EventName, properties: EventProperties = {}) => {
  // Breadcrumb en Sentry para contexto alrededor de errores
  Sentry.addBreadcrumb({
    category: 'user_action',
    message: event,
    data: properties,
    level: 'info',
  })

  // Envío al backend → Firestore (fire-and-forget, no bloquea la UI)
  api.post('/analytics/event', { event, properties }).catch(() => {})
}

export const analytics = {
  login: (userId: string, role: string) =>
    track('login', { userId, role }),

  register: (userId: string) =>
    track('register', { userId }),

  logout: () =>
    track('logout'),

  viewScreen: (screen: string) =>
    track('view_screen', { screen }),

  enrollCourse: (courseId: string, courseTitle: string) =>
    track('enroll_course', { courseId, courseTitle }),

  completeLesson: (lessonId: string, courseId: string) =>
    track('complete_lesson', { lessonId, courseId }),

  submitTask: (taskId: string, courseId: string) =>
    track('submit_task', { taskId, courseId }),

  viewCredential: (credentialId: string) =>
    track('view_credential', { credentialId }),

  completeOnboarding: (role: string) =>
    track('complete_onboarding', { role }),
}
