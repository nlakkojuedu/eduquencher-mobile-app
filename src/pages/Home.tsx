import { IonPage } from '@ionic/react';
import SimpleHome from '../components/SimpleHome';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <SimpleHome url="https://eduquencher.net" />
    </IonPage>
  );
};

export default Home;
