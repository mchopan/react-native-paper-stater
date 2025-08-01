import {Image, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {useTheme} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../theme/colors';
import {UserTypeContext} from '../../store/UserTypeContext';
import SelectTruckCard from '../../components/cards/SelectTruckCard';

const WelcomeScreen = ({navigation}) => {
  const {setUserAsDriver, setUserAsDealer} = useContext(UserTypeContext);

  const handleDealer = () => {
    setUserAsDealer();
    navigation.navigate('Login');
  };

  const handleDriver = () => {
    setUserAsDriver();
    navigation.navigate('Login');
  };

  // const handleNetwork = () => {
  //     navigation.navigate("Network Logs")
  // }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/quickload-splash.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonGroup}>
        <CustomButton
          label="I’m Dealer"
          mode="contained"
          onPress={handleDealer}
        />
        <CustomButton
          label="I’m Driver"
          mode="outlined"
          onPress={handleDriver}
        />
        {/* <CustomButton label='Network' mode='outlined' onPress={handleNetwork} /> */}
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteBackground,
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
  },
  buttonGroup: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
    gap: 10,
  },
});
