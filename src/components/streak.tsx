import { View, Text, Platform } from 'react-native'
import React from 'react'
import { basic } from '../styles/Layouts'
import { Image } from 'expo-image'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

type props={
    days: number
}

export default function Streak({days}:props) {
    return (
        <View style={{
            flexDirection: "row",
            backgroundColor: "#AEF0DA",
            alignItems: "center",
            borderRadius: 15,
            height: Platform.OS != "web" ? 45 : 35
        }}>
            <Image source={"https://static.thenounproject.com/png/778835-200.png"} style={{ alignSelf: "center", height: 12, width: 12, marginHorizontal: 10}} />
            <Text style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                marginRight: 10
            }}>{days} Día{days>1?"s":""} de{Platform.OS != "web" ? "\n" : " "}racha</Text>
        </View>
    )
}