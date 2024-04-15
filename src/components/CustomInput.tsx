import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {HelperText, Text, TextInput, useTheme} from 'react-native-paper';
import {Colors} from '../theme/colors';
import DatePicker from 'react-native-date-picker';
import {textVariants} from '../theme/styleVariants';

type CustomInputTypeProps = {
  type: 'text' | 'password' | 'date';
  keyboardType: 'email-address' | 'default' | 'phone-pad' | 'number-pad';
  label: string;
  onChangeText: (value: any) => void;
  value: any;
  placeholder?: string;
  data: [];
  hasError?: boolean;
  errorMessage?: string;
  passwordErrorMassage?: string;
  maxLength?: number;
};

const CustomInput = ({
  type,
  keyboardType,
  label,
  placeholder,
  onChangeText,
  value,
  hasError,
  errorMessage,
  passwordErrorMassage,
  maxLength,
}: CustomInputTypeProps) => {
  // you can change the mode here for every inputfield except the select type
  const mode = 'outlined';

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(true);

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(pre => !showPassword);
  };

  switch (type) {
    case 'text':
      return (
        <View style={{marginBottom: -5, gap: -7}}>
          <TextInput
            error={hasError}
            outlineColor={Colors.gray}
            textColor={theme.colors.primary}
            placeholderTextColor={theme.colors.secondary}
            style={[textVariants.textForm]}
            onChangeText={onChangeText}
            value={value}
            theme={{colors: {onSurfaceVariant: Colors.gray}, roundness: 10}}
            mode={mode}
            keyboardType={keyboardType}
            maxLength={maxLength || 80}
            label={label}
            placeholder={placeholder}
          />
          <HelperText type="error" visible={hasError}>
            {errorMessage}
          </HelperText>
        </View>
      );
    case 'password':
      return (
        <View style={{marginBottom: -5, gap: -7}}>
          <TextInput
            error={hasError}
            outlineColor={Colors.gray}
            textColor={theme.colors.primary}
            placeholderTextColor={theme.colors.secondary}
            style={textVariants.textForm}
            onChangeText={onChangeText}
            value={value}
            theme={{colors: {onSurfaceVariant: Colors.gray}, roundness: 10}}
            mode={mode}
            secureTextEntry={showPassword}
            keyboardType={'default'}
            label={label}
            placeholder={placeholder}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                color={theme.colors.primary}
                onPress={handleShowPassword}
              />
            }
          />
          <HelperText type="error" visible={hasError}>
            {passwordErrorMassage}
          </HelperText>
        </View>
      );
    case 'date':
      return (
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setOpen(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/billIcon.png')}
            />
            <Text
              style={[
                textVariants.default,
                {
                  color: Colors.gray,
                  marginLeft: 5,
                  fontFamily: 'GothicA1-Regular',
                },
              ]}>
              {/*  */}
              {flag ? 'Select Date' : date.toLocaleDateString()}
            </Text>
          </View>
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setFlag(false);
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>
      );
  }
};

export default CustomInput;

const styles = StyleSheet.create({
  datePicker: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 5, // Added padding for better spacing
  },
  label: {
    color: Colors.primary, // Set label color
    // marginBottom: 5, // Add margin bottom for separation
    padding: 5,
    fontSize: 17,
    paddingLeft: 15,
  },
});
