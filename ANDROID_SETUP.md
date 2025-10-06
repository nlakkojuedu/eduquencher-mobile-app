# Android Development Quick Setup

## Option 1: Install Android Studio (Recommended)

1. Download Android Studio: https://developer.android.com/studio
2. Install with default settings
3. Set environment variables:
   - ANDROID_HOME: C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   - Add to PATH: %ANDROID_HOME%\platform-tools

## Option 2: Use Physical Device

1. Enable Developer Options on your phone:
   Settings → About Phone → Tap Build Number 7 times

2. Enable USB Debugging:
   Settings → Developer Options → USB Debugging

3. Connect phone via USB and run:
   ```
   ionic capacitor run android
   ```

## Option 3: Manual Setup

1. Navigate to: D:\Edu\Mobile\eduquencher-app\android
2. Open this folder in Android Studio
3. Click "Run" button (green triangle)

## Troubleshooting

### Java Version Issue
- Capacitor requires JDK 11 or 17
- You have Java 25 (might cause issues)
- Install JDK 17: https://adoptium.net/

### Environment Variables
Add to Windows Environment Variables:
- ANDROID_HOME: C:\Users\[Username]\AppData\Local\Android\Sdk
- JAVA_HOME: C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot

### Common Commands
```bash
# Check setup
ionic doctor

# Build and sync
npm run build
ionic capacitor sync android

# Run on device
ionic capacitor run android

# Open in Android Studio
ionic capacitor open android
```

## Next Steps After Setup

1. Install Android Studio
2. Create AVD (Virtual Device)
3. Run: `ionic capacitor open android`
4. Click the green "Run" button
5. Your EduQuencher app will launch on Android! 📱

The app includes all features:
- Native Android interface
- Hardware back button support
- Splash screen
- Push notification ready
- Opens EduQuencher website perfectly
- No CORS issues!