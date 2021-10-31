
import TrackPlayer, { Capability } from 'react-native-track-player';
import radio from "../../radioOptions"

TrackPlayer.updateOptions({
    capabilities: [Capability.Play, Capability.Pause, Capability.Stop,],
    compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],

    stopWithApp: false,
});

export default async () => {
    await TrackPlayer.setupPlayer({waitForBuffer: true})
    await TrackPlayer.reset()
    await TrackPlayer.add([{
        title: "",
        artist: "",
        url: radio.RADIO_STREAM_URL,
    }]);
}

