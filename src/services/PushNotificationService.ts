import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export class PushNotificationService {
  
  async initialize() {
    if (Capacitor.isNativePlatform()) {
      await this.registerNotifications();
      await this.addListeners();
    }
  }

  private async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  private async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      // Send this token to your backend server
      this.sendTokenToServer(token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      // Handle notification received while app is in foreground
      this.handleForegroundNotification(notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      // Handle notification tap
      this.handleNotificationTap(notification);
    });
  }

  private async sendTokenToServer(token: string) {
    // Replace with your backend endpoint
    try {
      const response = await fetch('https://your-backend.com/api/register-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          platform: Capacitor.getPlatform(),
          appId: 'com.eduquencher.app'
        }),
      });
      
      if (response.ok) {
        console.log('Token sent to server successfully');
      }
    } catch (error) {
      console.error('Failed to send token to server:', error);
    }
  }

  private handleForegroundNotification(notification: any) {
    // Show in-app notification or update UI
    console.log('Notification received in foreground:', notification);
  }

  private handleNotificationTap(notification: any) {
    // Navigate to specific page or handle action
    console.log('Notification tapped:', notification);
    
    // Example: Navigate to a specific URL if provided in notification data
    if (notification.notification?.data?.url) {
      window.location.href = notification.notification.data.url;
    }
  }

  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
    return notificationList;
  }

  async removeDeliveredNotifications() {
    await PushNotifications.removeAllDeliveredNotifications();
  }
}