import React, { useState } from 'react';
import { 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { 
  openOutline, 
  globeOutline,
  schoolOutline
} from 'ionicons/icons';
import './SimpleHome.css';

interface SimpleHomeProps {
  url: string;
}

const SimpleHome: React.FC<SimpleHomeProps> = ({ url }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const openEduQuencher = () => {
    try {
      // Simple window.open for compatibility
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        showToastMessage('Opening EduQuencher...');
      } else {
        showToastMessage('Please allow popups for this app');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      showToastMessage('Error opening EduQuencher');
    }
  };

  const openInNewTab = () => {
    try {
      window.open(url, '_blank');
      showToastMessage('Opening in new tab...');
    } catch (error) {
      console.error('Error opening new tab:', error);
      showToastMessage('Please check your internet connection');
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>EduQuencher</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Hero Section */}
        <div className="hero-section-simple">
          <IonIcon icon={schoolOutline} className="hero-icon-simple" />
          <h1>Welcome to EduQuencher</h1>
          <p>Your gateway to quality education and learning resources</p>
        </div>

        {/* Main Actions */}
        <div className="actions-section">
          <IonButton 
            expand="block" 
            size="large"
            onClick={openEduQuencher}
            className="primary-button-simple"
          >
            <IonIcon icon={openOutline} slot="start" />
            Launch EduQuencher
          </IonButton>

          <IonButton 
            expand="block" 
            fill="outline"
            onClick={openInNewTab}
            className="secondary-button-simple"
          >
            <IonIcon icon={globeOutline} slot="start" />
            Open in Browser
          </IonButton>
        </div>

        {/* Info Card */}
        <IonCard className="info-card-simple">
          <IonCardHeader>
            <IonCardTitle>About EduQuencher App</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>
                This mobile app provides quick access to EduQuencher's 
                educational platform. Tap the buttons above to access 
                the full website with all features.
              </p>
            </IonText>
          </IonCardContent>
        </IonCard>

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

export default SimpleHome;