import radioOptions from "../../radioOptions"
import rssParse from "../helpers/rssParse";

export const fetchStreamInfo = async (setAlbumCover: React.Dispatch<any>, setTrackArtist: React.Dispatch<any>, setTrackName: React.Dispatch<any>) => {
    try {
        let res = await (await fetch(radioOptions.RADIO_STREAM_TRACK_INFO_URL)).json()
        setAlbumCover(res.cover)
        setTrackArtist(res.artist)
        setTrackName(res.title)
    } catch (error) {
        console.error(error)
    }
}

export const fetchPodcastsFromCastos = async (setPodcasts: React.Dispatch<any>) => {
    const podcasts: object[] = []

    try {
        console.log(`https://app.castos.com/api/v2/podcasts?token=${radioOptions.CASTOS_TOKEN}`)
        const list = (await (await fetch(`https://app.castos.com/api/v2/podcasts?token=${radioOptions.CASTOS_TOKEN}`)).json()).data.podcast_list
        for (let item in list) {
            console.log(`https://app.castos.com/api/v2/podcasts/${item}?token=${radioOptions.CASTOS_TOKEN}`)
            const podcast = (await (await fetch(`https://app.castos.com/api/v2/podcasts/${item}?token=${radioOptions.CASTOS_TOKEN}`)).json()).data
            let { title, description, image: { url }, items } = await rssParse("https://" + podcast.rss_url)
            const items_obj = items.map(item => {
                return {
                    title: item.title,
                    url: item.links[0].url,
                }
            })

            podcasts.push({
                title,
                description,
                imageUrl: url,
                items: items_obj
            })
        }
    } catch (error) {
        console.error("Error while trying to fetch podcast information from Castos, if you are not using Castos go to fetchRadioData.ts and update the code to fetch from your podcast resource. Error: " + error)
    }

    setPodcasts(podcasts)
}