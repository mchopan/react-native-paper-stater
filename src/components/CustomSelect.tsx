import {Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from 'react-native-paper';
import {Colors} from '../theme/colors';
import {textVariants} from '../theme/styleVariants';

type DropdownTypeProps = {
  data: {[key: string]: any}[];
  value: string;
  search?: boolean;
  onChange: (value: any) => void;
  labelField: string;
  valueField: string;
  placeholder: string;
  renderIcon?: any;
  mode: 'outlined' | 'flat';
};

const CustomSelect = ({
  data,
  value,
  search,
  placeholder,
  onChange,
  renderIcon,
  mode,
}: DropdownTypeProps) => {
  const theme = useTheme();

  switch (mode) {
    case 'outlined':
      return (
        <Dropdown
          style={[
            styles.dropdown,
            {
              borderColor: Colors.primary,
            },
          ]}
          fontFamily="GothicA1-Regular"
          placeholderStyle={[textVariants.default, {color: Colors.gray}]}
          selectedTextStyle={textVariants.default}
          iconStyle={styles.iconStyle}
          itemTextStyle={textVariants.default}
          activeColor={theme.colors.secondary}
          data={data}
          search={search}
          maxHeight={300}
          placeholder={placeholder}
          searchPlaceholder="Search..."
          inputSearchStyle={{color: theme.colors.primary}}
          value={value}
          onChange={onChange}
          labelField={'label'}
          valueField={'value'}
          renderLeftIcon={renderIcon}
        />
      );
    case 'flat':
      return (
        <Dropdown
          style={[
            styles.flatDropdown,
            {
              borderColor: Colors.primary,
            },
          ]}
          fontFamily="GothicA1-Regular"
          placeholderStyle={[textVariants.default, {color: Colors.gray}]}
          selectedTextStyle={textVariants.default}
          iconColor={theme.colors.primary}
          iconStyle={styles.iconStyle}
          itemTextStyle={textVariants.default}
          activeColor={theme.colors.secondary}
          data={data}
          search={search}
          maxHeight={300}
          placeholder={placeholder}
          searchPlaceholder="Search..."
          inputSearchStyle={{color: theme.colors.primary}}
          value={value}
          onChange={onChange}
          labelField={'label'}
          valueField={'value'}
          renderLeftIcon={renderIcon}
        />
      );

    default:
      break;
  }
};

CustomSelect.propTypes = {
  data: PropTypes.array.isRequired,
  // value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;

const styles = StyleSheet.create({
  flatDropdown: {
    height: 50,
    borderBottomWidth: 1,
    marginTop: 5,
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 15,
    height: 50,
    borderRadius: 10,
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  listItem: {
    color: 'white',
  },
});
