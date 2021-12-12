import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../helpers/colors'
import { safeWindowX } from '../helpers/dimensions'
import { podcast } from '../helpers/types'
import { playPodcast } from '../helpers/setupPlayer'


export default function Podcast({ item }: { item: podcast }) {
    function handleClickPodcast() {
        playPodcast(item.id)
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handleClickPodcast}>
            <View style={[styles.logoContainer, styles.shadow]}>
                <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: "100%", }} />
            </View>

            <View style={styles.descriptionContainer}>
                <Text numberOfLines={1} style={[styles.title, styles.textShadow]}>{item.title}</Text>
                <Text numberOfLines={2} style={[styles.description, styles.textShadow]}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.linksBackground,
        borderRadius: safeWindowX * .16 * .2,
        marginHorizontal: safeWindowX * .04,
        marginVertical: safeWindowX * .02,
    },
    logoContainer: {
        width: safeWindowX * .20,
        height: safeWindowX * .20,
        borderRadius: safeWindowX * .16 * .2,
        overflow: 'hidden',
    },
    descriptionContainer: {
        flex: 1,
        padding: safeWindowX * .03,
    },
    title: {
        color: colors.mainText,
        fontSize: safeWindowX * .05,
        marginBottom: safeWindowX * .004,
    },
    description: {
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