import { IonPage } from '@ionic/react';
import EduQuencherHome from '../components/EduQuencherHome';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <EduQuencherHome url="https://eduquencher.net" />
    </IonPage>
  );
};

export default Home;
