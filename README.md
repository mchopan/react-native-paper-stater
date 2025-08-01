# QuickLoad - React Native App

A comprehensive logistics and transportation management application built with React Native.

## 🚀 Features

- **Dealer Registration & Management**: Complete dealer onboarding with document verification
- **Driver Registration & Management**: Driver profiles with license and vehicle documentation
- **Load Booking System**: Create and manage transportation bookings
- **Real-time Negotiations**: Bid system for load pricing
- **Location Services**: GPS-based pickup and delivery tracking
- **Payment Integration**: Razorpay payment gateway integration
- **Document Management**: PDF generation and file handling
- **Push Notifications**: Firebase Cloud Messaging integration

## 📋 Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions.

### Required Tools

- Node.js (>= 16.x)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK 11 or newer)

## 🛠️ Installation

### Step 1: Clone and Install Dependencies

```bash
git clone <repository-url>
cd quickload
npm install
```

### Step 2: Environment Configuration

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Update `.env` with your configuration:

```env
API_BASE_URL=https://your-api-url.com/
MYAPP_UPLOAD_STORE_PASSWORD=your_secure_password
MYAPP_UPLOAD_KEY_PASSWORD=your_secure_password
FIREBASE_API_KEY=your_firebase_api_key
```

### Step 3: Platform Setup

#### Android Setup

```bash
cd android
./gradlew clean
cd ..
```

#### iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

## 🚀 Running the Application

### Step 1: Start Metro Server

```bash
npm start
```

### Step 2: Run on Device/Emulator

#### Android

```bash
npm run android
```

#### iOS

```bash
npm run ios
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Linting

```bash
npm run lint
```

### Fix Linting Issues

```bash
npm run lint -- --fix
```

## 📱 Build for Production

### Android APK

```bash
cd android
./gradlew assembleRelease
```

### Android AAB (Play Store)

```bash
cd android
./gradlew bundleRelease
```

### iOS (Xcode required)

```bash
npx react-native run-ios --configuration Release
```

## 🏗️ Project Structure

```
src/
├── api/                 # API services and configuration
├── components/          # Reusable UI components
├── navigation/          # Navigation configuration
├── screens/            # Screen components
│   ├── commonScreens/  # Shared screens
│   ├── dealer/         # Dealer-specific screens
│   └── driver/         # Driver-specific screens
├── store/              # Context and state management
└── assets/             # Images, fonts, and static files
```

## 🔧 Development Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm run lint -- --fix` - Fix linting issues
- `npm test` - Run tests

## 🔒 Security

See [SECURITY.md](./SECURITY.md) for security guidelines and best practices.

## 📚 API Documentation

The app connects to a backend API for:

- User authentication
- Booking management
- Payment processing
- File uploads
- Push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build issues**: Clean with `cd android && ./gradlew clean`
3. **iOS build issues**: Clean build folder in Xcode
4. **Environment variables not loading**: Restart Metro bundler after changing `.env`

### Getting Help

- Check the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
- Review the [Security Guidelines](./SECURITY.md)
- Check the project issues on GitHub

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev)
- [React Native Paper](https://reactnativepaper.com/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase for React Native](https://rnfirebase.io/)
