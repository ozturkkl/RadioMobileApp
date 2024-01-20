# RadioMobileApp

Radio Mobile App created with React Native


Run this command before creating the aab/apk:
`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

For Ios:
- Install rvm
- cd ios
- bundle install
- bundle exec pod install
- pod install