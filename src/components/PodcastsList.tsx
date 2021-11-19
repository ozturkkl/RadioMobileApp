import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../helpers/colors'
import { fetchPodcastsFromCastos } from '../helpers/fetchRadioData'

export default function PodcastsList() {
    const [podcasts, setPodcasts] = useState<{
        title: string,
        description: string,
        imageUrl: string,
        items: object
    }[]>([])

    useEffect(() => {
        fetchPodcastsFromCastos(setPodcasts)
    }, [])

    return (
        <View style={styles.container}>
            {podcasts.map((podcast, idx) => <Text key={idx} style={{color: "white", fontSize: 30}}>{podcast.title}</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        color: colors.mainText,
        alignItems: "center",
        justifyContent: "center",
    }
})

