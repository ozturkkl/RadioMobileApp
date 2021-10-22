export default {
    RADIO_ICON: require("../assets/images/radio_icon.png"),
    RADIO_NAME: "Radio Name",
    BACKGROUND_IMG: require("../assets/backgrounds/main_bg1.jpg"),
    FETCH_ALBUM_COVER_IMAGE: () => {
        // FETCH ALBUM COVER FROM RADIO API
        return require('../assets/images/album_cover.jpg')
    },
    FETCH_TRACK_ARTIST: () => {
        // FETCH TRACK ARTIST FROM RADIO API
        return "Example Artist"
    },
    FETCH_TRACK_NAME: () => {
        // FETCH TRACK ARTIST FROM RADIO API
        return "Example Track Name"
    }
};