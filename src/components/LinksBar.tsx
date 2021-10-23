import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import radio from "../helpers/radioOptions"
import Icon from 'react-native-vector-icons/Feather'
import colors from '../helpers/colors'

export default function LinksBar() {
    return (
        <View style={styles.linksContainer}>
            {radio.LINKS.map((link, idx) => (
                <TouchableOpacity key={idx} onPress={link.click}>
                    <Icon name={link.iconLabel} size={20} style={styles.linkIcon} color={colors.mainText} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    linksContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: colors.linksBackground,
        marginTop: 15,
    },
    linkIcon: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        color: colors.mainText,
    },
})
