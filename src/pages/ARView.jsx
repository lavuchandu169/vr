// src/pages/ARView.jsx
import React, { useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './ARView.css'; // We'll create a simple CSS too

function ARView() {
  const history = useHistory();

  useEffect(() => {
    // Load the MindAR script dynamically
    const mindarScript = document.createElement('script');
    mindarScript.src = "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image.prod.js";
    mindarScript.async = true;
    document.body.appendChild(mindarScript);

    const mindarThreeScript = document.createElement('script');
    mindarThreeScript.src = "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js";
    mindarThreeScript.async = true;
    document.body.appendChild(mindarThreeScript);

    return () => {
      // Cleanup scripts when unmounting
      document.body.removeChild(mindarScript);
      document.body.removeChild(mindarThreeScript);
    };
  }, []);

  const handleBack = () => {
    history.push('/data');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AR Furniture Viewer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ar-content">
        {/* MindAR WebAR Scene */}
        <div className="ar-container">
          <video id="video" autoPlay playsInline style={{ width: '100%' }}></video>
          <div id="mindarCanvas"></div>
          <p>Loading AR experience...</p>
        </div>

        <IonButton expand="block" className="back-button" onClick={handleBack}>
          Back to Furniture List
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default ARView;
