import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eduquencher.app',
  appName: 'EduQuencher',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    minWebViewVersion: 60
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true
  }
};

export default config;
