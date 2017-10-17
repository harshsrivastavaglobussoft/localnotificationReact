/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NotificationsIOS from 'react-native-notifications';
export default class LocalNotificatonSecond extends Component {
  constructor(){
    super();
    this.addListeners();
    this._checkPermision();
  }
  //adding the listeners event
  addListeners=()=>{
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));
  }
  //checking for permission for notifications
  _checkPermision=()=>{
    NotificationsIOS.checkPermissions().then((currentPermissions) => {
        console.log('Badges enabled: ' + !!currentPermissions.badge);
        console.log('Sounds enabled: ' + !!currentPermissions.sound);
        console.log('Alerts enabled: ' + !!currentPermissions.alert);
    });
  }
//listeners events
onNotificationReceivedForeground(notification) {
	console.log("Notification Received - Foreground", notification);
}

onNotificationReceivedBackground(notification) {
	console.log("Notification Received - Background", notification);
}

onNotificationOpened(notification) {
	console.log("Notification opened by device user", notification);
}
//trigering the notification with data
OnPressAction=()=>{
  let localNotification = NotificationsIOS.localNotification({
   alertBody: "Local notificiation!",
   alertTitle: "Local Notification Title",
   soundName: "chime.aiff",
   silent: false,
   category: "SOME_CATEGORY",
  userInfo: { }
  });
  console.log(localNotification);
}


  render() {
setInterval(()=>{this.OnPressAction()},4000);
    return (
      <View style={styles.viewContainer}>

      </View>
    );
  }
  componentWillMount(){
    //requesting for permissions
    NotificationsIOS.requestPermissions();
  }
  //unmounting the listeners event
  componentWillUnmount() {
  	// Don't forget to remove the event listeners to prevent memory leaks!
  	NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
  	NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
  	NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));
  }
}

const styles = StyleSheet.create({
  viewContainer:{
    flex:1,
    backgroundColor :'skyblue',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('LocalNotificatonSecond', () => LocalNotificatonSecond);
