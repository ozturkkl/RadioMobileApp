import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { safeWindowX, windowX } from "../helpers/dimensions"

import colors from '../helpers/colors'
import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';
import { playRadio } from '../helpers/setupPlayer';


export default function PlayButton() {
    const [trackPlaying, setTrackPlaying] = useState(false)
    const [loading, setLoading] = useState(false)
    useTrackPlayerEvents([Event.PlaybackState], async event => {
        if (event.state === State.Playing) setTrackPlaying(true)
        else setTrackPlaying(false)

        if (event.state === State.Connecting || event.state === State.Buffering || event.state === "buffering") setLoading(true)
        else setLoading(false)
    });
    useEffect(() => {
        TrackPlayer.getState().then(state => setTrackPlaying(state === State.Playing))
    }, [])
    async function handlePlay() {
        const state = await TrackPlayer.getState();
        if (state !== State.Playing && state !== State.Paused) {
            await playRadio()
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
                <Icon name={loading ? "loader" : trackPlaying ? "pause" : "play"} style={[styles.mainIcon, trackPlaying || loading ? {} : styles.playIcon]} />
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
    mainIcon: {
        fontSize: safeWindowX * .1,
        backgroundColor: colors.linksBackground,
        padding: safeWindowX * .036,
        paddingLeft: safeWindowX * (.036 + .001),
        paddingRight: safeWindowX * (.036 - .001),
        borderRadius: safeWindowX * .085,
        overflow: "hidden",
        marginHorizontal: safeWindowX * .03,
        color: colors.mainText,
    },
    playIcon: {
        paddingLeft: safeWindowX * (.036 + .01),
        paddingRight: safeWindowX * (.036 - .01),
    },
    sideIcons: {
        fontSize: safeWindowX * .07,
        paddingHorizontal: safeWindowX * .05,
        color: colors.mainText,
    },
})