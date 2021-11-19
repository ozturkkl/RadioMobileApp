import { Linking } from "react-native";

export default {
    RADIO_NAME: "Radio Name",
    RADIO_ICON: require("../assets/images/radio_icon.png"),
    RADIO_STREAM_URL: "https://exampleradio.com/stream/123421",
    RADIO_STREAM_URL_LOW_BITRATE: "https://exampleradio.com/stream/123422",
    RADIO_STREAM_TRACK_INFO_URL: "https://exampleradio.com/track-information/123421",
    CASTOS_TOKEN: "asdafs2hdn21dgb1289dvb7812",
    BACKGROUND_IMG: require("../assets/backgrounds/main_bg.jpg"),
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