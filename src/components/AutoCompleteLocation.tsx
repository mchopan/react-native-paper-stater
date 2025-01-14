import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {Colors} from '../theme/colors';

type Suggestion = {
  display_name: string;
};

type LocationAutocompleteProps = {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  suggestions: string[];
  zIndex?: number;
};

const LocationAutocomplete = ({
  placeholder,
  value,
  onChange,
  suggestions,
  zIndex = 1,
}: LocationAutocompleteProps) => {
  const [query, setQuery] = useState<string>(value);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    setQuery(text);
    onChange(text);

    // Filter suggestions based on input
    if (text.length > 0) {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setFilteredSuggestions([]);
    onChange(item);
  };

  return (
    <View style={[styles.container, {zIndex}]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={query}
        onChangeText={handleChangeText}
        accessible
        accessibilityLabel="Location input"
      />
      {filteredSuggestions.length > 0 && (
        <FlatList
          nestedScrollEnabled
          data={filteredSuggestions}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSelect(item)}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}
    </View>
  );
};

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    position: 'relative',
  },
  input: {
    fontSize: 14,
    fontFamily: 'GothicA1-Regular',
    color: Colors.primary,
    borderRadius: 12,
    padding: 12,
    paddingLeft: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  suggestionsList: {
    backgroundColor: 'white',
    maxHeight: 200,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 12,
    paddingHorizontal: 16,
  },
  suggestionText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: 'GothicA1-Regular',
  },
  loadingText: {
    color: Colors.gray,
    fontSize: 12,
    textAlign: 'center',
    padding: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    textAlign: 'center',
    padding: 8,
  },
});

export default LocationAutocomplete;
