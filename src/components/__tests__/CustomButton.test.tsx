import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import CustomButton from '../CustomButton';

const MockedProvider = ({children}: {children: React.ReactNode}) => (
  <PaperProvider>{children}</PaperProvider>
);

describe('CustomButton', () => {
  it('renders correctly with title', () => {
    const {getByText} = render(
      <MockedProvider>
        <CustomButton title="Test Button" onPress={() => {}} />
      </MockedProvider>,
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <MockedProvider>
        <CustomButton title="Test Button" onPress={mockOnPress} />
      </MockedProvider>,
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when loading prop is true', () => {
    const {getByTestId} = render(
      <MockedProvider>
        <CustomButton title="Test Button" onPress={() => {}} loading={true} />
      </MockedProvider>,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <MockedProvider>
        <CustomButton
          title="Test Button"
          onPress={mockOnPress}
          disabled={true}
        />
      </MockedProvider>,
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
