import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import colors from '../helpers/colors'
import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';
import setupPlayer from '../helpers/setupPlayer';



export default function PlayButton() {
    const [trackPlaying, setTrackPlaying] = useState(false)
    useTrackPlayerEvents([Event.PlaybackState], async event => {
        if (event.state === State.Playing) setTrackPlaying(true)
        else setTrackPlaying(false)
    });
    useEffect(() => {
        TrackPlayer.getState().then(state => setTrackPlaying(state === State.Playing))
    }, [])
    async function handlePlay() {
        const state = await TrackPlayer.getState();
        if (state !== State.Playing && state !== State.Paused && state !== State.Stopped) {
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
                <Icon name={trackPlaying ? "pause" : "play"} style={trackPlaying ? styles.pauseIcon : styles.playIcon} />
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
        width: "100%",
        justifyContent: "center",
        backgroundColor: colors.playButtonBackground,
    },
    buttonWrapper: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    playIcon: {
        fontSize: 40,
        backgroundColor: colors.linksBackground,
        padding: 15,
        paddingLeft: 19,
        paddingRight: 11,
        borderRadius: 100,
        margin: 10,
    },
    pauseIcon: {
        fontSize: 40,
        backgroundColor: colors.linksBackground,
        padding: 15,
        borderRadius: 100,
        margin: 10,
    },
    sideIcons: {
        fontSize: 25,
        padding: 15,
        paddingHorizontal: 20,
    },
})