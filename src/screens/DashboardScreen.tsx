import { View, Text, TouchableOpacity, Platform, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { basic } from '../styles/Layouts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Streak from '../components/streak';

type RootStackParamList = {
    LogIn: undefined
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "LogIn">;

export default function DashboardScreen() {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    const { width, height } = useWindowDimensions();
    const isWide = width > 600;
    const username = "Alex"
    const weekObj = 85
    const career = "Product Manager"
    const done = 74
    const studyHours = 128
    const finishCourses = 14
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text style={{ ...basic.title1, alignSelf: "flex-start", textAlign: "left", marginHorizontal: Platform.OS != "web" ? 20 : "10%", marginTop: Platform.OS != "web" ? 20 : "3%" }}>¡Bienvenido de{Platform.OS != "web" ? "\n" : " "}nuevo, {username}!</Text>
            <Text style={{ ...basic.text, alignSelf: "flex-start", textAlign: "left", paddingHorizontal: Platform.OS != "web" ? 20 : "10%", marginTop: Platform.OS != "web" ? 5 : 20, marginBottom: Platform.OS != "web" ? 30 : 40 }}>Has completado el {weekObj}% de tus objetivos semanales. ¡Sigue así!</Text>
            <View style={{ flexDirection: isWide ? "row" : "column", alignContent: "center", justifyContent: "center" }}>
                <View style={{ ...basic.modal, alignSelf: "center", borderWidth: 1, borderColor: "#ededed", marginHorizontal: 10, width: Platform.OS != "web" ? "90%" : "45%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 10, paddingBottom: 0 }}>
                        <Text style={{
                            ...basic.title2,
                            fontSize: Platform.OS != "web" ? 21 : 28,
                            textAlign: "left",
                            paddingBottom: 0
                        }}>Progreso{Platform.OS != "web" ? "\n" : " "}General</Text>
                        <Streak days={12} />
                    </View>
                    <Text style={{
                        ...basic.rawMedium,
                        fontSize: 12,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginLeft: Platform.OS != "web" ? "8%" : "5%",
                        maxWidth: Platform.OS != "web" ? "40%" : "auto",
                        color: "#3F4945"
                    }}>
                        Ruta de Carrera: {career}
                    </Text>
                    <View style={{
                        marginVertical: 20,
                        marginBottom: 10,
                        borderWidth: 5,
                        borderRadius: 200,
                        borderColor: "#075343",
                        paddingVertical: Platform.OS != "web" ? 15 : 20,
                        paddingHorizontal: 8
                    }}>
                        <Text style={{
                            fontFamily: "Inter_600SemiBold",
                            fontSize: 24
                        }}>{done}%</Text>
                    </View>
                    <Text style={{
                        ...basic.rawText,
                        fontSize: 16,
                        marginBottom: 20
                    }}>Completado</Text>
                    <Text style={{
                        ...basic.rawBoldText,
                        fontSize: 36,
                        color: "#075343",
                        alignSelf: "flex-start",
                        marginLeft: Platform.OS != "web" ? "8%" : "5%",
                    }}>
                        {studyHours}
                    </Text>
                    <Text style={{
                        ...basic.rawText,
                        fontSize: 16,
                        color: "#075343",
                        alignSelf: "flex-start",
                        marginLeft: Platform.OS != "web" ? "8%" : "5%",
                    }}>
                        HORAS DE ESTUDIO
                    </Text>
                    <Text style={{
                        ...basic.rawBoldText,
                        fontSize: 36,
                        color: "#6A3F00",
                        alignSelf: "flex-start",
                        marginLeft: Platform.OS != "web" ? "8%" : "5%",
                        marginTop: 20,
                    }}>
                        {finishCourses}
                    </Text>
                    <Text style={{
                        ...basic.rawText,
                        fontSize: 16,
                        color: "#075343",
                        alignSelf: "flex-start",
                        marginLeft: Platform.OS != "web" ? "8%" : "5%",
                        marginBottom: 20
                    }}>
                        CURSOS FINALIZADOS
                    </Text>
                </View>
                <View style={{
                    width: Platform.OS != "web" ? "90%" : "45%",
                    justifyContent: "space-between"
                }}>
                    <View style={{ ...basic.modal, alignSelf: "center", borderWidth: 1, borderColor: "#ededed", marginHorizontal: 10, width: Platform.OS != "web" ? "90%" : "100%", height: Platform.OS != "web" ? "auto" : "49%"}}>

                    </View>
                    <View style={{ ...basic.modal, alignSelf: "center", borderWidth: 1, borderColor: "#ededed", marginHorizontal: 10,width: Platform.OS != "web" ? "90%" : "100%", height: Platform.OS != "web" ? "auto" : "49%"}}>

                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={basic.buttonAlt}
                onPress={() => navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'LogIn' }],
                    })
                )}
                activeOpacity={0.7} // Controls how dim the view becomes (default 0.2)
            >
                <Text style={{ color: "#075343", alignSelf: "center", fontFamily: "Inter_600SemiBold", }}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}