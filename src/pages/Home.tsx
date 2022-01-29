import React from 'react';
import TopBar from '../components/TopNav';
import TrackDisplay from '../components/radio/RadioTrackDisplay';
import {navigationProps} from '../helpers/navigationSettings';
import PlayButton from '../components/radio/RadioPlayer';
import VolumeControl from '../components/VolumeControl';
import Container from './Container';

interface props extends navigationProps {}

export default function Home({navigation}: props) {
  return (
    <Container>
      <TopBar navigation={navigation} type="Home" />
      <TrackDisplay />
      <VolumeControl />
      <PlayButton />
    </Container>
  );
}
