import messaging from '@react-native-firebase/messaging';

// Register background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Handle the background message here
    console.log('Background message handled: ', remoteMessage);
});
