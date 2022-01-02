import * as rssParser from 'react-native-rss-parser';

export default (url: string) => {
  return fetch(url)
    .then(response => response.text())
    .then(responseData => rssParser.parse(responseData));
};
