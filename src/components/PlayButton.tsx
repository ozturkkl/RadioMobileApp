import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import colors from '../helpers/colors'

export default function PlayButton() {
    return (
        <TouchableOpacity onPress={() => { console.log("pressed") }} style={{ width: "100%" }}>
            <View style={styles.container}>
                <Icon name="play" size={40} style={styles.playIcon} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.playButtonBackground,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    playIcon: {
        backgroundColor: colors.linksBackground,
        padding: 15,
        paddingLeft: 19,
        paddingRight: 11,
        borderRadius: 100,
    }
})
