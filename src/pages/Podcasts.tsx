import React, {useContext, useEffect} from 'react';

import TopBar from '../components/TopNav';
import PodcastsList from '../components/podcast/PodcastsList';
import Container from './Container';

import {navigationProps} from '../helpers/navigationSettings';
import PodcastPlayer from '../components/podcast/PodcastPlayer';
import {AppContext} from '../helpers/state';
import {playingPodcastID} from '../helpers/setupPlayer';

interface props extends navigationProps {}

export default function Podcasts({navigation}: props) {
  const {appState, setAppState} = useContext(AppContext);
  useEffect(() => {
    if (playingPodcastID === null) {
      setAppState(state => ({...state, showPodcastPlayerControls: false}));
    }
  }, [setAppState]);

  return (
    <Container>
      <TopBar navigation={navigation} type="Podcasts" />
      <PodcastsList navigation={navigation} />
      {appState.showPodcastPlayerControls ? <PodcastPlayer /> : <></>}
    </Container>
  );
}
