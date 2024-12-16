import React, {useContext, useEffect} from 'react';
import TopNav from '../components/TopNav';
import RadioTrackDisplay from '../components/radio/RadioTrackDisplay';
import {navigationProps} from '../helpers/navigationSettings';
import RadioPlayer from '../components/radio/RadioPlayer';
import Container from './Container';
import {fetchPodcastsFromRssFeeds} from '../helpers/fetchRadioData';
import {AppContext} from '../helpers/state';
import PodcastPlayer from '../components/podcast/PodcastPlayer';
import VolumeControl from '../components/VolumeControl';
import {radioOptions} from '../../radioOptions';

interface props extends navigationProps {}

export default function Home({navigation}: props) {
  const {appState, setAppState} = useContext(AppContext);
  useEffect(() => {
    radioOptions.podcastRssUrls().then(urls =>
      fetchPodcastsFromRssFeeds(urls).then(podcasts => {
        setAppState({cachedPodcasts: podcasts});
      }),
    );
  }, [setAppState]);

  return (
    <Container>
      <TopNav navigation={navigation} type="Home" />
      <RadioTrackDisplay />
      <VolumeControl />
      {appState.showPodcastPlayerControls ? <PodcastPlayer /> : <RadioPlayer />}
    </Container>
  );
}
