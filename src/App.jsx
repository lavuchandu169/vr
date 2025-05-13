import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

import Home from './pages/Home';
import DataView from './pages/DataView';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';

setupIonicReact();

function AppInner() {
  const history = useHistory();

  useEffect(() => {
    const backButtonListener = CapacitorApp.addListener('backButton', () => {
      if (history.length > 1) {
        history.goBack();
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      backButtonListener.remove();
    };
  }, [history]);

  return (
    <IonRouterOutlet>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/data" component={DataView} />
      <Route exact path="/settings" component={Settings} />
      <Redirect exact from="/" to="/login" />
    </IonRouterOutlet>
  );
}

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AppInner />
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
