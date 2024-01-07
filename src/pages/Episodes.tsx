import React, {useContext} from 'react';

import TopBar from '../components/TopNav';
import EpisodeList from '../components/podcast/EpisodeList';
import PodcastPlayer from '../components/podcast/PodcastPlayer';
import Container from './Container';

import {navigationProps} from '../helpers/navigationSettings';
import {AppContext} from '../helpers/state';

interface props extends navigationProps {
  route: any;
}

export default function Episodes({route, navigation}: props) {
  const {appState} = useContext(AppContext);

  return (
    <Container>
      <TopBar navigation={navigation} type="Episodes" />
      <EpisodeList podcast={route.params.podcast} />
      {appState.showPodcastPlayerControls ? <PodcastPlayer /> : <></>}
    </Container>
  );
}
