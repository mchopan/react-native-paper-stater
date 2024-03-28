import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, useTheme} from 'react-native-paper';
import {Colors} from '../theme/colors';

type buttonTypeProps = {
  label: string;
  icon?: string;
  mode: 'contained' | 'outlined' | 'text';
  onPress?: () => {};
  direction: 'row' | 'column';
};

const CustomButton = ({
  label,
  icon,
  mode,
  onPress,
  direction,
  ...props
}: buttonTypeProps) => {
  return (
    <Button
      {...props}
      icon={icon}
      mode={mode}
      onPress={onPress}
      labelStyle={
        mode == 'contained' ? styles.containedLabel : styles.outLinedLabel
      }
      style={[
        styles.button,
        {
          backgroundColor:
            mode == 'outlined' ? Colors.tertiary : Colors.primary,
          width: direction == 'row' ? '45%' : '100%',
        },
      ]}>
      {label}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 4,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  containedLabel: {
    color: Colors.buttonText,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
  },
  outLinedLabel: {
    color: Colors.primary,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
  },
});
