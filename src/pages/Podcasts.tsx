import React from 'react';
import TopBar from '../components/TopNav';
import {navigationProps} from '../helpers/navigationSettings';
import VolumeControl from '../components/VolumeControl';
import Container from './Container';
import PodcastsList from '../components/podcast/PodcastsList';

interface props extends navigationProps {}

export default function Podcasts({navigation}: props) {
  return (
    <Container>
      <TopBar navigation={navigation} type="podcasts" />
      <PodcastsList />
    </Container>
  );
}
