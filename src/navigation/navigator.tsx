import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LogInScreen from '../screens/LogInScreen';
import { basic } from '../styles/Layouts';
import { Image } from "expo-image"
import DashboardScreen from '../screens/DashboardScreen';
import CatalogueScreen from '../screens/CatalogueScreen';

export type RootStackParamList = {
  SplashScreen:undefined;
  LogIn:       undefined;
  Dashboard:   undefined;
  Catalogue:   undefined;
  // Añadir cuando existan:
  // Progress: undefined;
  // Tasks:    undefined;
  // Profile:  undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogInScreen} options={{
        headerShown: Platform.OS !== 'web',
        headerTitle: () => <Text style={{ ...basic.title1, fontSize: 20 }}>SkillPath</Text>,
        headerRight: () => <Image source={"https://static.thenounproject.com/png/778835-200.png"} style={basic.icon} />,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerShadowVisible: true,
        headerBackVisible: false,
        headerLeft: () => null,
      }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{
        headerShown: false,
        headerBackVisible: false,
        headerLeft: () => null,
      }} />
      <Stack.Screen name="Catalogue" component={CatalogueScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}