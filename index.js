/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native'

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log("notifee on background")
    console.log("Background Event: ", type, detail);
    
    const {notification, pressAction} = detail;

    if (type === EventType.PRESS) {
        console.log('User pressed an action with the id: ', pressAction.id);
        // navigate here
        // return pressAction.id;
    }
    await notifee.cancelNotification(notification.id);
    console.log('background-event');
});

AppRegistry.registerComponent(appName, () => App);
