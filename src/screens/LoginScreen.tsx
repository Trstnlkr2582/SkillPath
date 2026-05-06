import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { basic } from '../styles/Layouts'
import Checkbox from 'expo-checkbox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    Dashboard: undefined
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Dashboard">;

export default function LogInScreen() {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false)

    return (
        <View style={{ ...basic.container, backgroundColor: "#F4F6F5", borderTopWidth: 2, borderColor: "#BFC9C4" }}>
            <View style={{ ...basic.container, justifyContent: "flex-end", position: "absolute", height: "100%", width: "100%" }}>
                <Text style={{ ...basic.bottomText, fontSize: 16 }}>© 2024 SkillPath. Sistema de Gestión de
                    Aprendizaje.</Text>
            </View>
            <View style={{ ...basic.container, width: "90%" }}>
                <View style={{ ...basic.modal, maxWidth: 450 }}>
                    <View style={{ alignItems: "flex-start", marginVertical: 120 }}>
                        <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 0, color: "black"}}>Bienvenido de nuevo</Text>
                        <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 0, textAlign: "left", marginBottom: 20 }}>Ingresa tus credenciales institucionales{"\n"}para continuar</Text>
                        <View style={{ alignItems: "flex-start" }}>
                            <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 0, color: "black", marginBottom: 10 }}>Correo electrónico institucional</Text>
                            <TextInput
                                style={basic.input}
                                placeholder="nombre@institucion.edu"
                                placeholderTextColor={"#6B7280"}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 0, color: "black" }}>Contraseña</Text>
                                <TouchableOpacity onPress={() => { }} activeOpacity={0.7}>
                                    <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 0, marginLeft: 45, color: "#075343" }}>Olvidé mi contraseña</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={basic.input}
                                placeholder="••••••••"
                                placeholderTextColor={"#6B7280"}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <Checkbox value={remember} onValueChange={setRemember} />
                                <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 10, color: "#3F4945" }}>Mantener sesión iniciada</Text>
                            </View>
                            <TouchableOpacity
                                style={{ ...basic.button, alignSelf: "center", marginTop: 30 }}
                                onPress={() => {
                                    if (email != "" && password != "") {
                                        navigation.replace('Dashboard');
                                        if (!remember) {
                                            setEmail("")
                                            setPassword("")
                                        }
                                    }
                                }}
                                activeOpacity={0.7}
                            >
                                <Text style={{ color: "#A7E9D3", alignSelf: "center", fontFamily: "Inter_600SemiBold", }}>Entrar</Text>
                            </TouchableOpacity>
                            <View style={{ ...basic.separator, alignSelf: "center" }} />
                            <View style={{ alignItems: "center", alignSelf: "center" }}>
                                <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 0, color: "#3F4945" }}>¿Necesita asistencia técnica?</Text>
                                <TouchableOpacity onPress={() => { }} activeOpacity={0.7}>
                                    <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 0, color: "black" }}>Centro de Ayuda</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", margin: 50, marginHorizontal: 120 }}>
                    <TouchableOpacity onPress={() => { }} activeOpacity={0.7}>
                        <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 10 }}>Privacidad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} activeOpacity={0.7}>
                        <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 10 }}>Términos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} activeOpacity={0.7}>
                        <Text style={{ ...basic.text, fontSize: 16, paddingHorizontal: 10 }}>Accesibilidad</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}