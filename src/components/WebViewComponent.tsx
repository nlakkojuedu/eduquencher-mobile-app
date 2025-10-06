import React, { useState, useEffect, useRef } from 'react';
import { 
  IonContent, 
  IonRefresher, 
  IonRefresherContent, 
  IonProgressBar, 
  IonToast,
  IonLoading,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { RefresherEventDetail } from '@ionic/core';
import { openOutline, refreshOutline, warningOutline } from 'ionicons/icons';
import './WebViewComponent.css';

interface WebViewComponentProps {
  url: string;
}

const WebViewComponent: React.FC<WebViewComponentProps> = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [networkStatus, setNetworkStatus] = useState(true);
  const [corsError, setCorsError] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if running on native platform
    setIsNative(Capacitor.isNativePlatform());
    
    // Initialize app and setup listeners
    initializeApp();
    
    // Cleanup listeners on unmount
    return () => {
      App.removeAllListeners();
    };
  }, []);

  const initializeApp = async () => {
    // Check network status
    const status = await Network.getStatus();
    setNetworkStatus(status.connected);

    // Listen for network changes
    Network.addListener('networkStatusChange', (status) => {
      setNetworkStatus(status.connected);
      if (!status.connected) {
        showToastMessage('No internet connection');
      } else {
        showToastMessage('Connection restored');
        reloadWebView();
      }
    });

    // Handle hardware back button
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        // Try to go back in webview history
        handleWebViewBack();
      } else {
        // Show exit confirmation
        showExitConfirmation();
      }
    });

    // Handle app state changes
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        // App resumed, check if reload is needed
        checkAndReload();
      }
    });
  };

  const handleWebViewBack = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.history.back();
      } catch (error) {
        console.log('Cannot access iframe history due to CORS');
        // If we can't access iframe history, reload to home
        reloadWebView();
      }
    }
  };

  const showExitConfirmation = () => {
    // In a real app, you'd show a proper confirmation dialog
    // For now, we'll just show a toast
    setToastMessage('Press back again to exit');
    setShowToast(true);
    
    // Auto exit after 2 seconds if user doesn't interact
    setTimeout(() => {
      App.exitApp();
    }, 2000);
  };

  const checkAndReload = async () => {
    // Check if device orientation changed or other conditions
    const deviceInfo = await Device.getInfo();
    // Reload logic can be implemented here if needed
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const reloadWebView = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      reloadWebView();
      event.detail.complete();
      showToastMessage('Page refreshed');
    }, 1000);
  };

  const handleIframeLoad = () => {
    setLoading(false);
    setCorsError(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setCorsError(true);
    showToastMessage('Cannot load website in iframe due to security restrictions.');
  };

  const openInSystemBrowser = async () => {
    await Browser.open({ url });
  };

  const openInInAppBrowser = async () => {
    if (isNative) {
      // On native platforms, open in in-app browser
      await Browser.open({ 
        url,
        windowName: '_blank',
        presentationStyle: 'fullscreen'
      });
    } else {
      // On web, open in new tab
      window.open(url, '_blank');
    }
  };

  const renderWebContent = () => {
    if (isNative) {
      // On native platforms, show buttons to open in browser
      return (
        <div className="native-content">
          <div className="native-header">
            <IonIcon icon={warningOutline} size="large" color="warning" />
            <IonText>
              <h2>EduQuencher</h2>
              <p>For the best experience, open the website in the browser</p>
            </IonText>
          </div>
          <div className="native-buttons">
            <IonButton 
              expand="block" 
              fill="solid" 
              onClick={openInInAppBrowser}
              className="primary-button"
            >
              <IonIcon icon={openOutline} slot="start" />
              Open EduQuencher
            </IonButton>
            <IonButton 
              expand="block" 
              fill="outline" 
              onClick={openInSystemBrowser}
              className="secondary-button"
            >
              <IonIcon icon={openOutline} slot="start" />
              Open in External Browser
            </IonButton>
          </div>
        </div>
      );
    } else if (corsError) {
      // On web with CORS error, show alternative
      return (
        <div className="cors-error-content">
          <div className="error-header">
            <IonIcon icon={warningOutline} size="large" color="danger" />
            <IonText>
              <h2>Connection Blocked</h2>
              <p>The website cannot be loaded in an iframe due to security restrictions.</p>
            </IonText>
          </div>
          <div className="error-buttons">
            <IonButton 
              expand="block" 
              fill="solid" 
              onClick={openInInAppBrowser}
            >
              <IonIcon icon={openOutline} slot="start" />
              Open EduQuencher in New Tab
            </IonButton>
            <IonButton 
              expand="block" 
              fill="outline" 
              onClick={() => {
                setCorsError(false);
                setLoading(true);
                reloadWebView();
              }}
            >
              <IonIcon icon={refreshOutline} slot="start" />
              Try Again
            </IonButton>
          </div>
        </div>
      );
    } else {
      // Try to load in iframe (will work for some sites)
      return (
        <iframe
          ref={iframeRef}
          src={url}
          className="webview-iframe"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="EduQuencher App"
          sandbox="allow-same-origin allow-scripts allow-forms allow-navigation allow-popups allow-top-navigation"
        />
      );
    }
  };

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent
          pullingIcon="chevron-down-outline"
          pullingText="Pull to refresh"
          refreshingSpinner="circular"
          refreshingText="Refreshing..."
        />
      </IonRefresher>

      {loading && <IonProgressBar type="indeterminate" />}

      <div className="webview-container">
        {!networkStatus && (
          <div className="offline-banner">
            <p>No internet connection</p>
          </div>
        )}
        
        {renderWebContent()}
      </div>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        position="bottom"
      />

      <IonLoading isOpen={loading} message="Loading..." />
    </IonContent>
  );
};

export default WebViewComponent;