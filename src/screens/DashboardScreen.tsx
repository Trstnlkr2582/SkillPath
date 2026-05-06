import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { basic } from '../styles/Layouts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    LogIn: undefined
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "LogIn">;

export default function DashboardScreen() {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    return (
        <View>
            <Text>DashboardScreen</Text>
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
        </View>
    )
}