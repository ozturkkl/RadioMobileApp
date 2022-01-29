import React from 'react';
import TopBar from '../components/TopNav';
import TrackDisplay from '../components/radio/RadioTrackDisplay';
import {navigationProps} from '../helpers/navigationSettings';
import PlayButton from '../components/radio/RadioPlayer';
import VolumeControl from '../components/VolumeControl';
import Container from './Container';
import PodcastsList from '../components/podcast/PodcastsList';

interface props extends navigationProps {}

export default function Podcasts({navigation}: props) {
  return (
    <Container>
      <TopBar navigation={navigation} type="podcasts" />
      <PodcastsList />
      {/* <TrackDisplay /> */}
      {/* <VolumeControl /> */}
      {/* <VolumeControl /> */}
      <PlayButton />
    </Container>
  );
}
