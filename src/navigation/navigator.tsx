import * as React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../context/AuthContext'
import { colors } from '../styles/theme'

// Auth
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'

// Student
import DashboardScreen from '../screens/DashboardScreen'
import CatalogScreen from '../screens/CatalogScreen'
import CredentialsScreen from '../screens/CredentialsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RoadmapScreen from '../screens/RoadmapScreen'
import CourseDetailScreen from '../screens/CourseDetailScreen'
import LessonScreen from '../screens/LessonScreen'
import SubmissionScreen from '../screens/SubmissionScreen'

// Admin
import AdminDashboardScreen from '../screens/AdminDashboardScreen'
import AdminCoursesScreen from '../screens/AdminCoursesScreen'
import AdminCreateCourseScreen from '../screens/AdminCreateCourseScreen'
import AdminCourseDetailScreen from '../screens/AdminCourseDetailScreen'
import AdminReportsScreen from '../screens/AdminReportsScreen'
import AdminUsersScreen from '../screens/AdminUsersScreen'
import AdminConfirmActionScreen from '../screens/AdminConfirmActionScreen'
import AdminAddUserScreen from '../screens/AdminAddUserScreen'
import AdminAnnouncementScreen from '../screens/AdminAnnouncementScreen'
import EditProfileScreen from '../screens/EditProfileScreen'

// Onboarding
import OnboardingScreen from '../screens/OnboardingScreen'

// Professor
import ProfessorDashboardScreen from '../screens/ProfessorDashboardScreen'
import ProfessorEvaluationResultScreen from '../screens/ProfessorEvaluationResultScreen'
import ProfessorAnnouncementScreen from '../screens/ProfessorAnnouncementScreen'
import ProfessorReviewScreen from '../screens/ProfessorReviewScreen'
import ProfessorStudentsListScreen from '../screens/ProfessorStudentsListScreen'
import ProfessorStudentDetailScreen from '../screens/ProfessorStudentDetailScreen'

const Stack = createNativeStackNavigator()

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

function StudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Catalog" component={CatalogScreen} />
      <Stack.Screen name="Credentials" component={CredentialsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Roadmap" component={RoadmapScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="Lesson" component={LessonScreen} />
      <Stack.Screen name="Submission" component={SubmissionScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

function ProfessorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfessorDashboard" component={ProfessorDashboardScreen} />
      <Stack.Screen name="ProfessorEvaluationResult" component={ProfessorEvaluationResultScreen} />
      <Stack.Screen name="ProfessorAnnouncement" component={ProfessorAnnouncementScreen} />
      <Stack.Screen name="ProfessorReview" component={ProfessorReviewScreen} />
      <Stack.Screen name="ProfessorStudentsList" component={ProfessorStudentsListScreen} />
      <Stack.Screen name="ProfessorStudentDetail" component={ProfessorStudentDetailScreen} />
      <Stack.Screen name="ProfessorCourses" component={AdminCoursesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="AdminCourses" component={AdminCoursesScreen} />
      <Stack.Screen name="AdminCreateCourse" component={AdminCreateCourseScreen} />
      <Stack.Screen name="AdminCourseDetail" component={AdminCourseDetailScreen} />
      <Stack.Screen name="AdminReports" component={AdminReportsScreen} />
      <Stack.Screen name="AdminUsers" component={AdminUsersScreen} />
      <Stack.Screen name="AdminAddUser" component={AdminAddUserScreen} />
      <Stack.Screen name="AdminAnnouncement" component={AdminAnnouncementScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="AdminConfirmAction"
        component={AdminConfirmActionScreen}
        options={{ presentation: 'transparentModal', animation: 'fade' }}
      />
    </Stack.Navigator>
  )
}

function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  )
}

export function RootStack() {
  const { user, role, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <AuthStack />
  if (!user.onboarding_completed) return <OnboardingStack />
  if (role === 'admin') return <AdminStack />
  if (role === 'professor') return <ProfessorStack />
  return <StudentStack />
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
})
