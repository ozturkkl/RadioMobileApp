import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

let safeX = width;
while (safeX / height >= 0.65) safeX -= 1;

export let {windowX, windowY, safeWindowX} = {windowX: width, windowY: height, safeWindowX: safeX};
