# EduQuencher Mobile App

A professional Ionic React mobile application that provides seamless access to EduQuencher educational platform.

## Features
- Native mobile interface for EduQuencher.net
- Hardware back button support
- Splash screen with branding
- Pull-to-refresh functionality
- Push notifications ready
- Cross-platform (Android/iOS)
- Optimized performance

## Cloud Build Ready
This project is configured for Ionic AppFlow cloud builds.

## Local Development
```bash
npm install
npm run build
ionic capacitor sync
```

## Production Build
```bash
npm run build
ionic capacitor sync android
ionic capacitor sync ios
```

## App Configuration
- App ID: com.eduquencher.app
- App Name: EduQuencher
- Target URL: https://eduquencher.net
- Minimum Android API: 24
- Minimum iOS: 13.0