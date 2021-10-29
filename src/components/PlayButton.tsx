import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { safeWindowX, windowX } from "../helpers/dimensions"

import colors from '../helpers/colors'
import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';
import setupPlayer from '../helpers/setupPlayer';



export default function PlayButton() {
    const [trackPlaying, setTrackPlaying] = useState(false)
    const [loading, setLoading] = useState(false)
    useTrackPlayerEvents([Event.PlaybackState], async event => {
        if (event.state === State.Playing) setTrackPlaying(true)
        else setTrackPlaying(false)

        if (event.state === State.Connecting || event.state === State.Buffering) setLoading(true)
        else setLoading(false)
    });
    useEffect(() => {
        TrackPlayer.getState().then(state => setTrackPlaying(state === State.Playing))
    }, [])
    async function handlePlay() {
        const state = await TrackPlayer.getState();
        if (state !== State.Playing && state !== State.Paused) {
            await setupPlayer()
        }
        if (state === State.Playing) {
            TrackPlayer.pause()
        }
        else {
            TrackPlayer.play()
        }
    }
    function handleStop() {
        TrackPlayer.stop()
    }
    function handleReset() {
        handleStop()
        handlePlay()
    }
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleStop} style={styles.buttonWrapper}>
                <Icon name="square" style={styles.sideIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlay} style={styles.buttonWrapper}>
                <Icon name={loading ? "loader" : trackPlaying ? "pause" : "play"} style={[trackPlaying || loading ? {} : styles.playIcon, styles.mainIcon]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReset} style={styles.buttonWrapper}>
                <Icon name="rotate-ccw" style={styles.sideIcons} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: "row",
        width: windowX,
        justifyContent: "center",
        backgroundColor: colors.playButtonBackground,
        height: "13%",
    },
    buttonWrapper: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    playIcon: {
        paddingLeft: safeWindowX * (.036 + .008),
        paddingRight: safeWindowX * (.036 - .008),
    },
    mainIcon: {
        fontSize: safeWindowX * .1,
        backgroundColor: colors.linksBackground,
        padding: safeWindowX * .036,
        borderRadius: safeWindowX * .085,
        marginHorizontal: safeWindowX * .03,
        color: colors.mainText,
    },
    sideIcons: {
        fontSize: safeWindowX * .07,
        paddingHorizontal: safeWindowX * .05,
        color: colors.mainText,
    },
})