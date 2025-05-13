import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonItem, IonLabel, IonToast, IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleRegister = () => {
    const user = { name, email, password };
    localStorage.setItem('weatherUser', JSON.stringify(user));
    setShowToast(true);
    setTimeout(() => history.push('/login'), 1500);
  };

  const goToLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="register-header">Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="register-container">
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput value={name} onIonChange={(e) => setName(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={email} onIonChange={(e) => setEmail(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value)} />
        </IonItem>
        <IonButton expand="block" onClick={handleRegister} className="register-button">
          Register
        </IonButton>

        <IonText className="login-redirect">
          <p>
            Already have an account?{' '}
            <span onClick={goToLogin}>Login here</span>
          </p>
        </IonText>

        <IonToast
          isOpen={showToast}
          message="Registered successfully!"
          duration={1500}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
}

export default Register;
