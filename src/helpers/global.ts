import {Dispatch, SetStateAction} from 'react';

let podcasts: Dispatch<SetStateAction<boolean>> | undefined;
let episodes: Dispatch<SetStateAction<boolean>> | undefined;

export default {
  setPodcastPlaying: {
    podcasts,
    episodes,
  },
};
