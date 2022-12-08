import React, {useState} from 'react';

import TopBar from '../components/TopNav';
import EpisodeList from '../components/podcast/EpisodeList';
import PodcastPlayer from '../components/podcast/PodcastPlayer';
import Container from './Container';

import {navigationProps} from '../helpers/navigationSettings';
import {currentPodcast} from '../helpers/setupPlayer';
import global from '../helpers/global';

interface props extends navigationProps {
  route: any;
}

export default function Episodes({route, navigation}: props) {
  const [podcastPlaying, setPodcastPlaying] = useState(!!currentPodcast);

  global.setPodcastPlaying.episodes = setPodcastPlaying;

  return (
    <Container>
      <TopBar navigation={navigation} type="Episodes" />
      <EpisodeList podcast={route.params.podcast} />
      {podcastPlaying ? <PodcastPlayer /> : <></>}
    </Container>
  );
}
