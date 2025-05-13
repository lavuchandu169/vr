import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel, IonButton, IonInput
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Settings.css';

function Settings() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('furnitureUser'));
    if (savedUser) {
      setUserName(savedUser.name);
      setUserEmail(savedUser.email);
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { name: userName, email: userEmail };
    localStorage.setItem('furnitureUser', JSON.stringify(updatedUser));
    history.push('/home');
  };

  const goBackHome = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="settings-container">
          <IonItem className="settings-item">
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              value={userName}
              placeholder="Enter your name"
              onIonInput={(e) => setUserName(e.detail.value)}
            />
          </IonItem>

          <IonItem className="settings-item">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={userEmail}
              placeholder="Enter your email"
              onIonInput={(e) => setUserEmail(e.detail.value)}
            />
          </IonItem>

          <IonButton expand="block" className="ion-margin-top" onClick={handleSave}>
            Save & Go Home
          </IonButton>

          <IonButton fill="outline" expand="block" className="ion-margin-top" onClick={goBackHome}>
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Settings;
