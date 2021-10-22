import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../helpers/colors'
import radio from "../helpers/radioOptions"
import LinksBar from './LinksBar'

export default function TrackDisplay() {
    return (
        <View style={styles.container}>
            <View style={styles.shadow}>
                <Image style={styles.albumCover} source={radio.FETCH_ALBUM_COVER_IMAGE()} />
            </View>
            <LinksBar />
            <Text style={[styles.trackArtist, styles.textShadow]}>{radio.FETCH_TRACK_ARTIST()}</Text>
            <Text style={[styles.trackName, styles.textShadow]}>{radio.FETCH_TRACK_NAME()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        margin: 50,
        padding: 10,
    },
    albumCover: {
        width: 225,
        height: 225,
        backgroundColor: "black",
        borderRadius: 10,
        borderColor: colors.albumCoverBorder,
        borderWidth: 3,

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        borderRadius: 10,
    },
    textShadow: {
        textShadowColor: "black",
        textShadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowRadius: 10,
    },
    trackArtist: {
        marginTop: 25,
        fontSize: 16,
    },
    trackName: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: '500',
    },
})

