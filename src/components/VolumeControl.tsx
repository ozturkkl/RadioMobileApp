import Slider from '@react-native-community/slider'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import TrackPlayer from 'react-native-track-player';
import colors from '../helpers/colors';

export default function VolumeControl() {
    const [volume, setVolume] = useState(1)
    const [volumeIcon, setVolumeIcon] = useState("volume-2")
    const [muted, setMuted] = useState(false)
    useEffect(() => {
        TrackPlayer.setVolume(muted ? 0 : volume)
        setVolumeIcon(volume < .3 ? "volume" : volume < .7 ? "volume-1" : "volume-2")
    }, [volume, muted])
    return (
        <View style={styles.volumeSliderWrapper}>
            <TouchableOpacity onPress={() => {
                setMuted(value => { return !value })
            }}>
                <Icon name={muted ? "volume-x" : volumeIcon} style={styles.volumeIcon} />
            </TouchableOpacity>
            <Slider
                style={{ width: 300, height: 50 }}
                value={muted ? 0 : volume}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={val => {
                    val === 0 ? setMuted(true) : setMuted(false)
                    setVolume(val)
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    volumeSliderWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    volumeIcon: {
        fontSize: 20,
        color: colors.mainText,
    }
})
