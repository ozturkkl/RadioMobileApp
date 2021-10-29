import React, { useEffect, useState } from 'react'
import { Easing, Image, StyleSheet, Text, View } from 'react-native'
import TextTicker from 'react-native-text-ticker'
import colors from '../helpers/colors'
import radio from "../../radioOptions"
import LinksBar from './LinksBar'
import { safeWindowX } from "../helpers/dimensions"


export default function TrackDisplay() {
    const [albumCover, setAlbumCover] = useState("")
    const [trackArtist, setTrackArtist] = useState("")
    const [trackName, setTrackName] = useState("")
    useEffect(() => {
        const destroy = setInterval(() => {
            radio.FETCH_TRACK_INFO(setAlbumCover, setTrackArtist, setTrackName)
        }, 1000);
        return () => {
            clearInterval(destroy)
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.shadow}>
                <Image style={styles.albumCover} defaultSource={radio.RADIO_ICON} source={!albumCover ? radio.RADIO_ICON : { uri: albumCover }} />
            </View>
            <LinksBar />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.trackArtist, styles.textShadow]}>{!trackArtist ? radio.RADIO_NAME : trackArtist}</Text>
            <TextTicker
                easing={Easing.linear}
                bounceSpeed={150}
                bouncePadding={{ left: 10, right: 10 }}
                bounceDelay={3000}
                marqueeDelay={1000}
                repeatSpacer={50}
                scrollSpeed={50}
                style={[styles.trackName, styles.textShadow]}>{trackName}</TextTicker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    albumCover: {
        width: safeWindowX * .57,
        height: safeWindowX * .57,
        borderRadius: 10,
        borderColor: colors.albumCoverBorder,
        borderWidth: 3,
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
        borderRadius: 10,
    },
    textShadow: {
        textShadowColor: colors.shadowColor,
        textShadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowRadius: 10,
    },
    trackArtist: {
        marginTop: safeWindowX * .035,
        fontSize: safeWindowX * .04,
        color: colors.mainText,
    },
    trackName: {
        marginTop: safeWindowX * .012,
        fontSize: safeWindowX * .055,
        fontWeight: '500',
        color: colors.mainText,
    },
})

