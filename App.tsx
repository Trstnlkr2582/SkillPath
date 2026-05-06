import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from "./src/navigation/navigator";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_800ExtraBold, Inter_600SemiBold, Inter_500Medium } from '@expo-google-fonts/inter';

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
    Inter_600SemiBold,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
