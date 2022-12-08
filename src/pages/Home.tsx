import React from 'react';
import TopNav from '../components/TopNav';
import RadioTrackDisplay from '../components/radio/RadioTrackDisplay';
import {navigationProps} from '../helpers/navigationSettings';
import RadioPlayer from '../components/radio/RadioPlayer';
import VolumeControl from '../components/VolumeControl';
import Container from './Container';

interface props extends navigationProps {}

export default function Home({navigation}: props) {
  return (
    <Container>
      <TopNav navigation={navigation} type="Home" />
      <RadioTrackDisplay />
      <VolumeControl />
      <RadioPlayer />
    </Container>
  );
}
