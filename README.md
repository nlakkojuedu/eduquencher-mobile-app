# EduQuencher Mobile App

A high-performance Ionic React mobile application that loads the EduQuencher website (https://eduquencher.com) in a native webview with enhanced mobile features.

## 🚀 Features

- **WebView Integration**: Loads EduQuencher.com seamlessly in a native webview
- **Hardware Back Button**: Smart navigation and exit confirmation
- **Splash Screen**: Custom branding with smooth transitions
- **Progress Loading**: Visual feedback during content loading
- **Pull-to-Refresh**: Swipe down to refresh webview content
- **Orientation Handling**: Prevents unwanted reloads on device rotation
- **Push Notifications**: Firebase Cloud Messaging integration
- **Offline Support**: Network status detection and offline handling
- **Performance Optimized**: Fast loading and smooth animations
- **Cross-Platform**: Supports both Android and iOS

## 📱 Requirements

### Development Environment
- Node.js 16+ and npm
- Ionic CLI (`npm install -g @ionic/cli`)
- Capacitor CLI (included in project)

### Android Development
- Android Studio
- Android SDK (API level 24+)
- Java Development Kit (JDK) 11+

### iOS Development (macOS only)
- Xcode 13+
- iOS 13+
- CocoaPods (`sudo gem install cocoapods`)

## 🛠️ Installation

1. **Clone/Navigate to the project directory**
   ```bash
   cd D:\Edu\Mobile\eduquencher-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Sync with native platforms**
   ```bash
   ionic capacitor sync
   ```

## 🏃‍♂️ Running the App

### Web Browser (Development)
```bash
ionic serve
```
The app will open at `http://localhost:8100`

### Android
```bash
# Open in Android Studio
ionic capacitor open android

# Or run directly (requires Android device/emulator)
ionic capacitor run android
```

### iOS (macOS only)
```bash
# Open in Xcode
ionic capacitor open ios

# Or run directly (requires iOS device/simulator)
ionic capacitor run ios
```

## 📋 Build Commands

```bash
# Development build
npm run build

# Production build with optimizations
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 🔧 Configuration

### App Configuration
The main configuration is in `capacitor.config.ts`:
- App ID: `com.eduquencher.app`
- App Name: `EduQuencher`
- Target URL: `https://eduquencher.com`

### Environment Variables
Create `.env` files for different environments:
- `.env.development`
- `.env.production`

### Push Notifications
To enable push notifications:
1. Set up Firebase project
2. Add `google-services.json` (Android) to `android/app/`
3. Add `GoogleService-Info.plist` (iOS) to `ios/App/App/`
4. Update the backend URL in `PushNotificationService.ts`

## 🎨 Customization

### App Icons and Splash Screens
1. Replace source files in `resources/` directory:
   - `icon.png` (1024x1024px)
   - `splash.png` (2732x2732px)

2. Generate assets:
   ```bash
   cordova-res
   ```

### Styling
- Main styles: `src/theme/variables.css`
- Component styles: Individual `.css` files
- WebView styles: `src/components/WebViewComponent.css`

### WebView Configuration
Modify `src/components/WebViewComponent.tsx` to:
- Change target URL
- Adjust loading behavior
- Customize error handling
- Modify refresh functionality

## 📁 Project Structure

```
eduquencher-app/
├── src/
│   ├── components/
│   │   ├── WebViewComponent.tsx      # Main webview component
│   │   └── WebViewComponent.css      # Webview styling
│   ├── pages/
│   │   └── Home.tsx                  # Main app page
│   ├── services/
│   │   └── PushNotificationService.ts # Push notification handling
│   ├── theme/
│   │   └── variables.css             # App theming
│   └── App.tsx                       # Main app component
├── android/                          # Android native project
├── ios/                             # iOS native project
├── public/                          # Static assets
├── resources/                       # Icon and splash screen sources
├── capacitor.config.ts              # Capacitor configuration
├── vite.config.ts                   # Build configuration
└── package.json                     # Dependencies and scripts
```

## 🔍 Key Components

### WebViewComponent
- Handles website loading in iframe
- Manages loading states and error handling
- Implements pull-to-refresh functionality
- Handles network connectivity changes
- Provides hardware back button support

### PushNotificationService
- Initializes push notification permissions
- Handles registration tokens
- Manages foreground and background notifications
- Provides notification tap handling

### App Component
- Initializes native plugins
- Configures splash screen and status bar
- Sets up global app behavior

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Capacitor Sync Issues**
   ```bash
   # Clean and sync
   ionic capacitor sync --force
   ```

3. **Android Build Issues**
   - Ensure Android Studio and SDK are properly installed
   - Check Java version (JDK 11+ required)
   - Verify ANDROID_HOME environment variable

4. **iOS Build Issues**
   - Ensure Xcode is updated
   - Run `pod install` in `ios/App/` directory
   - Check iOS deployment target (13.0+)

### Performance Issues
- Enable hardware acceleration in WebView
- Optimize image sizes and formats
- Use lazy loading for heavy content
- Monitor memory usage in native tools

## 📱 Platform-Specific Notes

### Android
- Minimum SDK: API 24 (Android 7.0)
- Target SDK: Latest available
- Uses Android WebView for content rendering
- Supports adaptive icons

### iOS
- Minimum iOS: 13.0
- Uses WKWebView for content rendering
- Requires developer account for device testing
- App Store submission requires proper provisioning

## 🔐 Security Considerations

- WebView sandbox restrictions applied
- HTTPS enforced for all network requests
- Content Security Policy implemented
- No access to device file system from WebView

## 📈 Performance Optimizations

- Code splitting and lazy loading
- Terser minification for production
- Legacy browser support with polyfills
- Optimized chunk sizes
- Hardware acceleration enabled
- Memory leak prevention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the Ionic documentation: https://ionicframework.com/docs

## 🔄 Updates and Deployment

### Development Updates
```bash
# Update dependencies
npm update

# Update Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest
ionic capacitor sync
```

### Production Deployment
1. Update version in `package.json`
2. Build production version: `npm run build`
3. Sync native projects: `ionic capacitor sync`
4. Build platform-specific packages in Android Studio/Xcode
5. Submit to app stores

---

**Built with ❤️ using Ionic React and Capacitor**