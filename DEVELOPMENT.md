# Development Guide

## Code Quality Standards

### ESLint Configuration
The project uses ESLint with React Native specific rules. Run linting with:
```bash
npm run lint
npm run lint -- --fix  # Auto-fix issues
```

### TypeScript Configuration
- Strict mode enabled for better type safety
- All new files should use TypeScript (.tsx/.ts)
- Proper type definitions required for all components

### Code Style Guidelines

#### Component Structure
```typescript
// Good: TypeScript with proper types
interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const MyComponent: React.FC<Props> = ({title, onPress, disabled = false}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
```

#### Avoid Inline Styles
```typescript
// Bad
<View style={{flex: 1, padding: 10}}>

// Good
<View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
```

#### API Service Pattern
```typescript
class MyService {
  static async getData(id: string): Promise<ApiResponse> {
    try {
      const response = await axiosInstance.get(`/data/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
```

### Performance Best Practices

1. **Use StyleSheet.create()** instead of inline styles
2. **Implement React.memo()** for expensive components
3. **Use useCallback()** for event handlers
4. **Optimize FlatList** with proper keyExtractor and getItemLayout
5. **Lazy load screens** with React.lazy()

### Testing Guidelines

#### Component Tests
- Test component rendering
- Test user interactions
- Test prop handling
- Mock external dependencies

#### API Tests
- Test service methods
- Mock HTTP requests
- Test error handling
- Validate response types

### Git Workflow

1. Create feature branch from main
2. Make changes with descriptive commits
3. Run tests and linting
4. Create pull request
5. Code review and merge

### Commit Message Format
```
type(scope): description

feat(auth): add login functionality
fix(api): handle network errors
docs(readme): update installation guide
style(components): fix linting issues
test(api): add service tests
```

### Environment Setup

#### Development
```env
API_BASE_URL=http://localhost:3000/
DEBUG=true
```

#### Production
```env
API_BASE_URL=https://api.production.com/
DEBUG=false
```

### Debugging

#### React Native Debugger
1. Install React Native Debugger
2. Enable Debug JS Remotely
3. Use Redux DevTools for state inspection

#### Flipper Integration
1. Install Flipper
2. Use network inspector
3. Monitor performance metrics

### Common Issues and Solutions

#### Metro Bundler Issues
```bash
npx react-native start --reset-cache
```

#### Android Build Issues
```bash
cd android && ./gradlew clean
```

#### iOS Build Issues
```bash
cd ios && rm -rf Pods && pod install
```

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] No inline styles used
- [ ] Error handling implemented
- [ ] Tests added for new functionality
- [ ] Documentation updated
- [ ] No console.log statements in production code
- [ ] Performance considerations addressed
- [ ] Security best practices followed
