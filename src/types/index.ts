export type UserRole = 'student' | 'professor' | 'admin'

export interface User {
  uid: string
  email: string
  name: string
  role: UserRole
  onboarding_completed: boolean
  institutional_verified: boolean
  enrolled_courses: string[]
  preferences?: {
    language: 'es' | 'en'
    notifications: boolean
    dark_mode: boolean
  }
  academic_profile?: {
    career: string
    faculty: string
    semester: number
    interests: string[]
    skills: string[]
  }
  professional_profile?: {
    department: string
    specializations: string[]
    teaching_subjects: string[]
  }
  created_at?: string
  last_login?: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_hours: number
  professor_id: string
  tags: string[]
  target_careers: string[]
  status: 'draft' | 'review' | 'published' | 'archived'
  enrolled_students: string[]
  analytics: {
    total_students: number
    average_completion: number
    rating: number
  }
  created_at?: string
  updated_at?: string
}

export interface Lesson {
  id: string
  course_id: string
  title: string
  description: string
  level: 'basic' | 'intermediate' | 'advanced'
  type: 'video' | 'text' | 'interactive' | 'quiz'
  duration_minutes: number
  content_url: string
  is_preview: boolean
  order: number
  resources: Array<{
    title: string
    url: string
    type: string
  }>
}

export interface Progress {
  user_id: string
  course_id: string
  completed_lessons: string[]
  current_level: 'basic' | 'intermediate' | 'advanced'
  last_lesson_id: string
  last_position_seconds: number
  total_study_hours: number
  completion_percentage: number
  completed: boolean
  updated_at?: string
}

export interface Task {
  id: string
  course_id: string
  title: string
  description: string
  competency_level: 'basic' | 'intermediate' | 'advanced'
  deadline: string
  max_score: number
  rubric: Array<{
    criterion: string
    weight: number
  }>
  status: 'draft' | 'published' | 'archived'
}

export interface Evidence {
  id: string
  student_id: string
  course_id: string
  task_id: string
  files: Array<{ url: string; type: string; name: string }>
  links: Array<{ url: string; name: string }>
  status: 'pending' | 'approved' | 'rejected' | 'in_correction'
  score: number
  reviewer_comment: string
  submitted_at: string
}

export interface Credential {
  id: string
  student_id: string
  course_id: string
  template_id: string
  verification_code: string
  issued_by: string
  issued_at: string
  expires_at: string | null
  status: 'active' | 'revoked'
  course?: Course
  template?: {
    title: string
    description: string
    skills: string[]
  }
}

export interface Notification {
  id: string
  title: string
  body: string
  type: string
  read: boolean
  created_at: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
