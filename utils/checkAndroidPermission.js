import {PermissionsAndroid, Platform} from 'react-native';

export const checkAndroidPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const granted = await PermissionsAndroid.requestMultiple([
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ]);
    if (
      granted['android.permission.CAMERA'] !== 'granted' ||
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted'
    ) {
      throw new Error('Required permission not granted');
    }
  }
};
