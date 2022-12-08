import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

let safeX = width;
while (safeX / height >= 0.55) safeX = (safeX * 14) / 15;

export let {windowX, windowY, safeWindowX} = {windowX: width, windowY: height, safeWindowX: safeX};
