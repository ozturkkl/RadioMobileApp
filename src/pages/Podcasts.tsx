import React from 'react';

import TopBar from '../components/TopNav';
import PodcastsList from '../components/podcast/PodcastsList';
import Container from './Container';

import {navigationProps} from '../helpers/navigationSettings';

interface props extends navigationProps {}

export default function Podcasts({navigation}: props) {
  return (
    <Container>
      <TopBar navigation={navigation} type="Podcasts" />
      <PodcastsList navigation={navigation} />
    </Container>
  );
}
