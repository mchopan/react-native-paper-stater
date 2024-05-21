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
};

const LocationAutocomplete = ({
  placeholder,
  value,
  onChange,
}: LocationAutocompleteProps) => {
  const [query, setQuery] = useState<string>(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length > 2) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${text}&countrycodes=IN`,
        );
        const data: Suggestion[] = await response.json();
        setSuggestions(data);
      } catch (error) {
        setError('Failed to fetch suggestions');
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSelect = (item: Suggestion) => {
    setQuery(item.display_name);
    setSuggestions([]);
    onChange(item.display_name);
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    onChange(text);
    debounceFetchSuggestions(text);
  };

  const debounceFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [fetchSuggestions],
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={query}
        onChangeText={handleChangeText}
        accessible
        accessibilityLabel="Location input"
      />
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {suggestions.length > 0 && (
        <FlatList
          nestedScrollEnabled
          data={suggestions}
          keyExtractor={item => item.display_name}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSelect(item)}>
              <Text style={styles.suggestionText}>{item.display_name}</Text>
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
    marginBottom: -5,
  },
  input: {
    fontSize: 12,
    fontFamily: 'GothicA1-Regular',
    color: Colors.primary,
    borderRadius: 10,
    padding: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  suggestionsList: {
    backgroundColor: 'white',
    maxHeight: 150,
    marginTop: 10,
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  suggestionText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'GothicA1-Regular',
  },
  loadingText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default LocationAutocomplete;
