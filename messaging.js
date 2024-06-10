// /src/services/notificationService.js

import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

// Request permission to receive notifications
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

// Get the FCM token
export async function getToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('Your Firebase Cloud Messaging token is:', fcmToken);
        // Save this token to your backend database
    } else {
        console.log('Failed to get FCM token');
    }
}

// Handle foreground messages
export function handleForegroundMessages() {
    return messaging().onMessage(async remoteMessage => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        Toast.show({
            type: "info",
            text1: remoteMessage.notification.body,
            visibilityTime: 10000
        })
    });
}

// Handle background messages
export function handleBackgroundMessages() {
    return messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
}
