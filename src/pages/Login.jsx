import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonItem, IonLabel, IonToast, IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('weatherUser'));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem('loggedIn', 'true');
      history.push('/home');
    } else {
      setShowError(true);
    }
  };

  const goToRegister = () => {
    history.push('/register');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="login-header">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="login-container">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value)}
            required
          />
        </IonItem>
        <IonButton expand="block" onClick={handleLogin} className="login-button">
          Login
        </IonButton>

        <IonText className="register-link">
          <p>
            Don&apos;t have an account?{' '}
            <span onClick={goToRegister}>
              Register here
            </span>
          </p>
        </IonText>

        <IonToast
          isOpen={showError}
          message="Invalid credentials"
          duration={1500}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;
