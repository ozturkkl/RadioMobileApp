import React from 'react'
import { Button, Text, View } from 'react-native'

interface props {
    navigation?: any
    route?: any
}

export default function Settings({ navigation, route }: props) {
    console.log(route)
    return (
        <View>
            <Button
                title="Home"
                onPress={() =>
                    navigation.navigate('Home')
                }
            />
            <Text>Settings Page</Text>
        </View>
    )
}
