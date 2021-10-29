import React, { useState } from 'react'
import { Button, ImageBackground, StyleSheet, Switch, Text, View } from 'react-native'
import TopBar from '../components/TopBar'
import radio from "../../radioOptions"
import { navigationProps, navigationStyle } from "../helpers/navigationSettings"
import colors from '../helpers/colors'

interface props extends navigationProps { }

export default function Settings({ navigation }: props) {
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <ImageBackground source={radio.BACKGROUND_IMG} resizeMode="cover" blurRadius={colors.backgroundBlur} style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.usableArea}>
                    <TopBar navigation={navigation} settings={true} />
                    <Text style={{ color: colors.mainText }}>Settings coming soon...</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    ...navigationStyle
})