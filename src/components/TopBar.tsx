import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import radio from "../../radioOptions"
import { navigationProps } from "../helpers/navigationSettings"
import colors from '../helpers/colors';

import { safeWindowX } from "../helpers/dimensions"


interface props extends navigationProps {
    settings?: boolean
}

export default function TopBar({ navigation, settings }: props) {

    return (
        <View style={styles.container}>
            <View style={[styles.logoContainer, styles.shadow]}>
                <Image source={radio.RADIO_ICON} style={{ width: "100%", height: "100%", }} />
            </View>

            <Text style={[styles.header, styles.textShadow]}>{radio.RADIO_NAME}</Text>

            <TouchableOpacity
                style={styles.settingsIconContainer}
                onPress={() => {
                    if (settings)
                        navigation.navigate('Home')
                    else
                        navigation.navigate('Settings')
                }}>

                <Icon name={settings ? "home" : "menu"} style={styles.settingsIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "15%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    logoContainer: {
        width: safeWindowX * .16,
        height: safeWindowX * .16,
        borderRadius: safeWindowX * .16 * .5,
        overflow: 'hidden',
    },
    header: {
        width: "50%",
        textAlign: "center",
        fontSize: safeWindowX * .065,
        fontWeight: "400",
        paddingBottom: safeWindowX * .017,
        color: colors.mainText,
    },
    settingsIconContainer: {
        width: safeWindowX * .16,
        height: safeWindowX * .16,
        alignItems: "center",
        justifyContent: "center",
    },
    settingsIcon: {
        fontSize: safeWindowX * .11,
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
