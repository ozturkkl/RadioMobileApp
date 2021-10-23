import { Linking } from "react-native";

export default {
    RADIO_NAME: "Radio Name",
    RADIO_ICON: require("../assets/images/radio_icon.png"),
    RADIO_STREAM_URL: "exampleradio.com/stream/123421",
    BACKGROUND_IMG: require("../assets/backgrounds/main_bg.jpg"),
    FETCH_TRACK_INFO: async (setAlbumCover: React.Dispatch<any>, setTrackArtist: React.Dispatch<any>, setTrackName: React.Dispatch<any>) => {
        let res = await (await fetch("exampleradio.com/track-information/123421")).json()
        setAlbumCover(res.cover)
        setTrackArtist(res.artist)
        setTrackName(res.title)
    },
    LINKS: [
        {
            iconLabel: "youtube",
            click: () => {
                Linking.openURL("https://youtube.com/").catch(err => console.error("Couldn't load page", err));
            }
        },
        {
            iconLabel: "link",
            click: () => {
                Linking.openURL("https://google.com").catch(err => console.error("Couldn't load page", err));
            }
        },
        {
            iconLabel: "mail",
            click: () => {
                Linking.openURL("mailto:97kemalozturk@gmail.com").catch(err => console.error("Couldn't load page", err));
            }
        },
    ]
};