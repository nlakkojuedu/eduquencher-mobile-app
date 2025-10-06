# EduQuencher Mobile App - Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js 16+ installed
- [ ] npm or yarn package manager
- [ ] Ionic CLI installed globally (`npm install -g @ionic/cli`)
- [ ] Android Studio (for Android development)
- [ ] Xcode (for iOS development, macOS only)

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd D:\Edu\Mobile\eduquencher-app
npm install
```

### 2. Test in Browser
```bash
ionic serve
```
Visit `http://localhost:8100` to see the app running.

### 3. Build for Mobile
```bash
npm run build
ionic capacitor sync
```

### 4. Run on Android
```bash
ionic capacitor open android
```
Then click "Run" in Android Studio.

### 5. Run on iOS (macOS only)
```bash
ionic capacitor open ios
```
Then click "Run" in Xcode.

## 📱 Features Included

✅ **WebView Integration** - Loads eduquencher.com natively  
✅ **Back Button Support** - Smart navigation and exit confirmation  
✅ **Splash Screen** - Professional app loading experience  
✅ **Pull to Refresh** - Swipe down to reload content  
✅ **Loading Indicators** - Visual feedback during loading  
✅ **Orientation Handling** - Prevents unwanted reloads  
✅ **Push Notifications** - Ready for Firebase integration  
✅ **Offline Detection** - Network status awareness  
✅ **Performance Optimized** - Fast loading and smooth animations  
✅ **Cross-Platform** - Works on Android and iOS  

## 🔧 Common Customizations

### Change Target Website
Edit `src/pages/Home.tsx`:
```tsx
<WebViewComponent url="https://your-website.com" />
```

### Update App Name/ID
Edit `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  appName: 'Your App Name',
  // ...
};
```

### Add Your App Icon
1. Replace `resources/icon.png` with your 1024x1024 icon
2. Replace `resources/splash.png` with your 2732x2732 splash screen
3. Run: `cordova-res`

## 🐛 Troubleshooting

**Build Issues?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Android Issues?**
- Ensure Android Studio is installed
- Check that ANDROID_HOME is set
- Use Java 11+

**iOS Issues?**
- Ensure Xcode is updated
- Run `pod install` in `ios/App/`

## 📞 Need Help?

- Check the full README.md for detailed documentation
- Ionic docs: https://ionicframework.com/docs
- Capacitor docs: https://capacitorjs.com/docs

---
**🎉 Your app is ready to go!**