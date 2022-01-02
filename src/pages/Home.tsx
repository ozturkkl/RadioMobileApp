import React from 'react';
import TopBar from '../components/TopBar';
import TrackDisplay from '../components/TrackDisplay';
import {navigationProps} from '../helpers/navigationSettings';
import PlayButton from '../components/PlayButton';
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
