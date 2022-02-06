import React from 'react';

import TopBar from '../components/TopNav';
import EpisodeList from '../components/podcast/EpisodeList';
import PodcastPlayer from '../components/podcast/PodcastPlayer';
import Container from './Container';

import {navigationProps} from '../helpers/navigationSettings';

interface props extends navigationProps {
  route: any;
}

export default function Episodes({route, navigation}: props) {
  return (
    <Container>
      <TopBar navigation={navigation} type="Episodes" />
      <EpisodeList podcast={route.params.podcast} />
      <PodcastPlayer />
    </Container>
  );
}
