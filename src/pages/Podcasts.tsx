import React, {useState} from 'react';

import TopBar from '../components/TopNav';
import PodcastsList from '../components/podcast/PodcastsList';
import Container from './Container';

import {navigationProps} from '../helpers/navigationSettings';
import PodcastPlayer from '../components/podcast/PodcastPlayer';
import {currentPodcast} from '../helpers/setupPlayer';
import global from '../helpers/global';

interface props extends navigationProps {}

export default function Podcasts({navigation}: props) {
  const [podcastPlaying, setPodcastPlaying] = useState(!!currentPodcast);

  global.setPodcastPlaying.podcasts = setPodcastPlaying;

  return (
    <Container>
      <TopBar navigation={navigation} type="Podcasts" />
      <PodcastsList navigation={navigation} />
      {podcastPlaying ? <PodcastPlayer /> : <></>}
    </Container>
  );
}
