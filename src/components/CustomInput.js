import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';

const CustomInput = ({ type, ...props }) => {
  // Render different input components based on the 'type' prop
  switch (type) {
    case 'text':
      return <TextInput {...props} />;
    case 'password':
      return <TextInput secureTextEntry {...props} />;
    case 'select':
      // Example of using react-native-dropdown-picker for select dropdown
      return (
        <Dropdown
          labelField="value"
          valueField="value"
          placeholder='Hello'
          placeholderStyle={{ color: "red" }}
          {...props}
        />
      );
    default:
      return <TextInput {...props} />;
  }
};

export default CustomInput;
