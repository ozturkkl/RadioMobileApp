import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { fetchPodcastsFromCastos } from '../helpers/fetchRadioData'
import { podcast } from '../helpers/types'
import Podcast from './Podcast'


export default function PodcastsList() {
    const [podcasts, setPodcasts] = useState<podcast[]>([])

    useEffect(() => {
        fetchPodcastsFromCastos(setPodcasts)
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={podcasts}
                renderItem={Podcast}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
    }
})

