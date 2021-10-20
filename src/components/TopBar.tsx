import React from 'react'
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import radio from "../helpers/importRadioOptions"


export default function TopBar({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Image source={radio.RADIO_ICON} style={styles.logo} />

            <Text style={styles.header}>{radio.RADIO_NAME}</Text>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Settings', { name: 'Jane' })
                }>

                <Icon name="settings" size={40} style={styles.settingsIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 85,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        marginLeft: 15,
        width: 55,
        height: 55,
    },
    header: {
        flex: 1,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "400",
        textShadowColor: "black",
        textShadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowRadius: 20,
    },
    settingsIcon: {
        marginRight: 15,
        color: "#ddd",
    }
})
