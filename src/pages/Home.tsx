import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import TopBar from '../components/TopBar'
import TrackDisplay from '../components/TrackDisplay'
import radio from "../helpers/radioOptions"
import {navigationProps, navigationStyle} from "../helpers/navigationProps"
import PlayButton from '../components/PlayButton'
import colors from '../helpers/colors'
import VolumeControl from '../components/VolumeControl'

interface props extends navigationProps{}

export default function MainPage({ navigation }: props) {
    return (
        <ImageBackground source={radio.BACKGROUND_IMG} resizeMode="cover" blurRadius={colors.backgroundBlur} style={{flex: 1}}>
            <View style={styles.main}>
                <TopBar navigation={navigation}/>
                <TrackDisplay />
                <VolumeControl />
                <PlayButton />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    ...navigationStyle,
})


