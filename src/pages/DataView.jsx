import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonBackButton, IonButton,
  IonIcon, IonPopover, IonList, IonItem, IonLabel, IonImg
} from '@ionic/react';
import { personCircleOutline, logOutOutline } from 'ionicons/icons';
import { getProducts } from '../api'; // ✅ Import from your new API file

function DataView() {
  const [products, setProducts] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('furnitureUser'));
    setUser(savedUser || {});

    // ✅ Use the updated API call
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  const handleProductSelect = (product) => {
    // Save selected product in localStorage and navigate to AR view
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = '/ar-view';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Select Furniture</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={(e) => {
                e.persist();
                setPopoverEvent(e.nativeEvent);
                setShowPopover(true);
              }}
            >
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {products.length > 0 ? (
            products.map(product => (
              <IonItem button key={product.id} onClick={() => handleProductSelect(product)}>
                <IonImg
                  src={product.thumbnail || product.image}
                  style={{ width: '60px', height: '60px', marginRight: '15px', objectFit: 'cover', borderRadius: '8px' }}
                  alt={product.title}
                />
                <IonLabel>
                  <h2 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{product.title}</h2>
                  <p style={{ fontSize: '0.9rem' }}>${product.price}</p>
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No furniture items available.</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>{user?.name || 'User'}</strong><br />
              <small>{user?.email || 'user@example.com'}</small>
            </IonLabel>
          </IonItem>
          <IonItem button onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonPage>
  );
}

export default DataView;
