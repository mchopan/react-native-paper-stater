import API_BASE_URL from '../apiConfig';

// Mock react-native-config
jest.mock('react-native-config', () => ({
  API_BASE_URL: 'https://test-api.com/',
}));

describe('API Configuration', () => {
  it('should use environment variable when available', () => {
    expect(API_BASE_URL).toBe('https://test-api.com/');
  });

  it('should be a valid URL', () => {
    expect(() => new URL(API_BASE_URL)).not.toThrow();
  });

  it('should use HTTPS protocol', () => {
    const url = new URL(API_BASE_URL);
    expect(url.protocol).toBe('https:');
  });
});
