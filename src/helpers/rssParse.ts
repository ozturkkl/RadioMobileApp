import * as rssParser from 'react-native-rss-parser';

var headers = new Headers();
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');

export default (url: string) => {
  return fetch(url, {headers})
    .then(response => response.text())
    .then(responseData => rssParser.parse(responseData));
};
