import Slider from '@react-native-community/slider'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import TrackPlayer from 'react-native-track-player';
import colors from '../helpers/colors';
import { safeWindowX } from "../helpers/dimensions"
import { getData, setData } from '../helpers/storage';

export default function VolumeControl() {
    const [volume, setVolume] = useState(1)
    const [volumeIcon, setVolumeIcon] = useState("volume-2")
    const [muted, setMuted] = useState(false)

    useEffect(() => {
        getData("volume").then(data => data && setVolume(parseFloat(data)) && changeVolume(parseFloat(data)))
    }, [])
    useEffect(() => changeVolume(volume), [volume])
    useEffect(() => {muted ? TrackPlayer.setVolume(0) : TrackPlayer.setVolume(volume)}, [muted])

    function changeVolume(newVol: number) {
        TrackPlayer.setVolume(newVol)
        newVol === 0 ? setMuted(true) : setMuted(false)
        setVolumeIcon(newVol < .3 ? "volume" : newVol < .7 ? "volume-1" : "volume-2")
        setData("volume", newVol.toString())
    }

    return (
        <View style={styles.volumeSliderWrapper}>
            <TouchableOpacity onPress={() => {
                setMuted(value => { return !value })
            }}>
                <Icon name={muted ? "volume-x" : volumeIcon} style={styles.volumeIcon} />
            </TouchableOpacity>
            <Slider
                style={{ width: safeWindowX * .75, height: safeWindowX * .15 }}
                value={muted ? 0 : volume}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={val => setVolume(val)}
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
        fontSize: safeWindowX * .07,
        color: colors.mainText,
    }
})
