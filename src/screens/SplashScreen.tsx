import { View, Text, Touchable, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Image } from "expo-image"
import React from 'react'
import { basic } from '../styles/Layouts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  LogIn: undefined
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "LogIn">;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const isWide = width > 600;
  return (
    <View style={{ ...basic.container, backgroundColor: "#ecfdfb" }}>
      <View style={{ ...basic.container, justifyContent: "flex-end", position: "absolute", height: "100%", width: "100%" }}>
        <Text style={basic.bottomText}>© 2024 SkillPath Professional Education. Todos los
          derechos reservados.</Text>
      </View>
      <View style={{ ...basic.container, flex: 0 }}>
        <Image source={"https://static.thenounproject.com/png/778835-200.png"} style={{ ...basic.icon, height: 96, width: 96, shadowOpacity: 25, shadowRadius: 25, shadowColor: "#b7cede"}} />
        <Text style={basic.title1}>SkillPath</Text>
        <Text style={basic.title2}>Tu futuro profesional{"\n"}empieza aquí.</Text>
        <Text style={basic.text}>Domina nuevas habilidades con rutas{"\n"}de aprendizaje personalizadas y rigor{"\n"}académico de alto nivel.</Text>
        <View style={{ height: 20 }} />
        <TouchableOpacity
          style={basic.button}
          onPress={() => console.log('Pressed')}
          activeOpacity={0.7} // Controls how dim the view becomes (default 0.2)
        >
          <Text style={{ color: "#A7E9D3", alignSelf: "center", fontFamily: "Inter_600SemiBold", }}>Comenzar ahora →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.buttonAlt}
          onPress={() => navigation.replace('LogIn')}
          activeOpacity={0.7} // Controls how dim the view becomes (default 0.2)
        >
          <Text style={{ color: "#075343", alignSelf: "center", fontFamily: "Inter_600SemiBold", }}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={basic.separator} />
        <View style={{ flexDirection: isWide ? "row" : "column", alignContent: "center", justifyContent: "center"}}>
          <Image source={"https://static.thenounproject.com/png/778835-200.png"} style={{...basic.icon, alignSelf: "center"}} />
          <Text style={{ ...basic.title2, fontFamily: "Inter_500Medium", fontSize: 12, padding: 5, alignSelf: "center"}}>Certificaciones Oficiales</Text>
          <Image source={"https://static.thenounproject.com/png/778835-200.png"} style={{...basic.icon, alignSelf: "center"}} />
          <Text style={{ ...basic.title2, fontFamily: "Inter_500Medium", fontSize: 12, padding: 5, alignSelf: "center"}}>Rigor Académico</Text>
          <Image source={"https://static.thenounproject.com/png/778835-200.png"} style={{...basic.icon, alignSelf: "center"}} />
          <Text style={{ ...basic.title2, fontFamily: "Inter_500Medium", fontSize: 12, padding: 5, alignSelf: "center"}}>Crecimiento Profesional</Text>
        </View>
        <View style={{ height: 20 }} />
      </View>
    </View>
  )
}
