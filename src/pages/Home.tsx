import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import TopBar from '../components/TopBar'
import TrackDisplay from '../components/TrackDisplay'
import radio from "../../radioOptions"
import { navigationProps, navigationStyle } from "../helpers/navigationSettings"
import PlayButton from '../components/PlayButton'
import colors from '../helpers/colors'
import VolumeControl from '../components/VolumeControl'

interface props extends navigationProps { }

export default function MainPage({ navigation }: props) {
    return (
        <View style={{ flex: 1, backgroundColor: "#202020" }}>
            <ImageBackground source={radio.BACKGROUND_IMG} resizeMode="cover" blurRadius={colors.backgroundBlur} style={{ flex: 1 }}>
                <View style={styles.main}>
                    <View style={styles.usableArea}>
                        <TopBar navigation={navigation} />
                        <TrackDisplay />
                        <VolumeControl />
                        <PlayButton />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    ...navigationStyle,
})


