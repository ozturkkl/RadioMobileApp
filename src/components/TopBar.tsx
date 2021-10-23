import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import radio from "../helpers/radioOptions"
import {navigationProps} from "../helpers/navigationProps"
import colors from '../helpers/colors';


interface props extends navigationProps {
    settings?: boolean
}

export default function TopBar({ navigation, settings }: props) {

    return (
        <View style={styles.container}>
            <View style={[styles.logoContainer, styles.shadow]}>
                <Image source={radio.RADIO_ICON} style={styles.logo} />
            </View>

            <Text style={[styles.header, styles.textShadow]}>{radio.RADIO_NAME}</Text>

            <TouchableOpacity
                onPress={() => {
                    if (settings)
                        navigation.navigate('Home')
                    else
                        navigation.navigate('Settings')
                }}>

                <Icon name={settings ? "home" : "settings"} size={40} style={styles.settingsIcon} />
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
        width: 55,
        height: 55,
    },
    logoContainer: {
        marginLeft: 15,
        borderRadius: 100,
    },
    header: {
        flex: 1,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "400",
        color: colors.mainText,
    },
    settingsIcon: {
        marginRight: 15,
        color: colors.mainText,
    },
    shadow: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    textShadow: {
        textShadowColor: colors.shadowColor,
        textShadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowRadius: 20,
    },
})
