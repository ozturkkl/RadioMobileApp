import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import TopBar from '../components/TopBar'
import TrackDisplay from '../components/TrackDisplay'
import radio from "../helpers/radioOptions"
import navigationProps from "../helpers/navigationProps"

interface props extends navigationProps{}

export default function MainPage({ navigation }: props) {
    return (
        <ImageBackground source={radio.BACKGROUND_IMG} resizeMode="cover" blurRadius={15} style={{flex: 1}}>
            <View style={styles.main}>
                <TopBar navigation={navigation}/>
                <TrackDisplay />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#00000077",
        // backgroundColor: "white",
        alignItems: "center",
    }
})


