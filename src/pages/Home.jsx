import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonIcon, IonPopover, IonItem, IonLabel
} from '@ionic/react';
import { personCircleOutline, settingsOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.css';

function Home() {
  const [user, setUser] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('furnitureUser'));
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
      history.push('/login');
    } else {
      setUser(savedUser);
    }
  }, [history]);

  const logout = () => {
    localStorage.removeItem('loggedIn');
    setShowPopover(false);
    history.push('/login');
  };

  const goToFurnitureList = () => {
    history.push('/data'); // DataView shows furniture list
  };

  const openPopover = (e) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  const goToSettings = () => {
    setShowPopover(false);
    history.push('/settings');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Furniture AR Viewer</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={openPopover}>
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-container">
        {user && <h2 className="home-welcome">Welcome, {user.name}!</h2>}
        <div className="intro-text">
          <p>Visualize furniture in your real space using Augmented Reality!</p>
        </div>

        <IonButton onClick={goToFurnitureList} color="primary" expand="block" className="main-button">
          View Furniture Catalog
        </IonButton>

        <IonPopover
          event={popoverEvent}
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
        >
          <IonItem lines="none">
            <IonLabel>
              <strong>{user?.name || 'User'}</strong><br />
              <small>{user?.email || 'user@example.com'}</small>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={goToSettings}>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
          </IonItem>

          <IonItem button onClick={logout}>
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel color="danger">Logout</IonLabel>
          </IonItem>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
}

export default Home;
