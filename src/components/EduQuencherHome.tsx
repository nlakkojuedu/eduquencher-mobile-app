import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { 
  openOutline, 
  refreshOutline, 
  globeOutline,
  schoolOutline,
  bookOutline,
  peopleOutline,
  chatbubblesOutline,
  informationCircleOutline
} from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';
import './EduQuencherHome.css';

interface EduQuencherHomeProps {
  url: string;
}

const EduQuencherHome: React.FC<EduQuencherHomeProps> = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [networkStatus, setNetworkStatus] = useState(true);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    initializeApp();
    
    return () => {
      App.removeAllListeners();
      Network.removeAllListeners();
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
      }
    });

    // Handle hardware back button
    if (isNative) {
      App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          showExitConfirmation();
        }
      });
    }
  };

  const showExitConfirmation = () => {
    setToastMessage('Press back again to exit');
    setShowToast(true);
    
    setTimeout(() => {
      App.exitApp();
    }, 2000);
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const openEduQuencher = async () => {
    setLoading(true);
    try {
      if (isNative) {
        // On native platforms, open in in-app browser with proper configuration
        await Browser.open({ 
          url,
          windowName: '_blank',
          presentationStyle: 'fullscreen',
          toolbarColor: '#3880ff'
        });
      } else {
        // On web platform, open in new tab
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      showToastMessage('Opening EduQuencher...');
    } catch (error) {
      console.error('Error opening browser:', error);
      showToastMessage('Failed to open EduQuencher. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openInExternalBrowser = async () => {
    setLoading(true);
    try {
      if (isNative) {
        await Browser.open({ url });
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      showToastMessage('Opening in external browser...');
    } catch (error) {
      console.error('Error opening external browser:', error);
      showToastMessage('Failed to open external browser.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    // Simulate refresh by checking network status
    const status = await Network.getStatus();
    setNetworkStatus(status.connected);
    
    setTimeout(() => {
      event.detail.complete();
      showToastMessage('App refreshed');
    }, 1000);
  };

  const quickActions = [
    {
      title: 'Courses',
      subtitle: 'Browse available courses',
      icon: bookOutline,
      action: openEduQuencher
    },
    {
      title: 'Community',
      subtitle: 'Connect with learners',
      icon: peopleOutline,
      action: openEduQuencher
    },
    {
      title: 'Discussions',
      subtitle: 'Join conversations',
      icon: chatbubblesOutline,
      action: openEduQuencher
    },
    {
      title: 'About',
      subtitle: 'Learn more about EduQuencher',
      icon: informationCircleOutline,
      action: openEduQuencher
    }
  ];

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>EduQuencher</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon="chevron-down-outline"
            pullingText="Pull to refresh"
            refreshingSpinner="circular"
            refreshingText="Refreshing..."
          />
        </IonRefresher>

        {loading && <IonProgressBar type="indeterminate" color="primary" />}

        {!networkStatus && (
          <div className="offline-banner">
            <IonIcon icon={globeOutline} />
            <p>No internet connection</p>
          </div>
        )}

        <div className="home-container">
          {/* Hero Section */}
          <div className="hero-section">
            <IonIcon icon={schoolOutline} className="hero-icon" />
            <h1>Welcome to EduQuencher</h1>
            <p>Your gateway to quality education and learning resources</p>
          </div>

          {/* Main Actions */}
          <div className="main-actions">
            <IonButton 
              expand="block" 
              size="large"
              onClick={openEduQuencher}
              disabled={!networkStatus || loading}
              className="primary-action"
            >
              <IonIcon icon={openOutline} slot="start" />
              Launch EduQuencher
            </IonButton>

            <IonButton 
              expand="block" 
              fill="outline"
              onClick={openInExternalBrowser}
              disabled={!networkStatus || loading}
              className="secondary-action"
            >
              <IonIcon icon={globeOutline} slot="start" />
              Open in Browser
            </IonButton>
          </div>

          {/* Quick Actions */}
          <IonCard className="quick-actions-card">
            <IonCardHeader>
              <IonCardTitle>Quick Access</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {quickActions.map((action, index) => (
                  <IonItem 
                    key={index}
                    button 
                    onClick={action.action}
                    disabled={!networkStatus || loading}
                  >
                    <IonIcon icon={action.icon} slot="start" color="primary" />
                    <IonLabel>
                      <h3>{action.title}</h3>
                      <p>{action.subtitle}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Info Section */}
          <IonCard className="info-card">
            <IonCardContent>
              <div className="info-content">
                <IonIcon icon={informationCircleOutline} color="primary" />
                <div>
                  <h3>About This App</h3>
                  <p>
                    This native mobile app provides quick access to EduQuencher's 
                    educational platform. Enjoy seamless browsing with mobile-optimized 
                    features including offline detection and native navigation.
                  </p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
        />
      </IonContent>
    </>
  );
};

export default EduQuencherHome;