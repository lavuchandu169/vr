import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg
} from '@ionic/react';
import './WeatherCard.css'; // Keep CSS but we'll slightly adjust it

function WeatherCard({ title, price, description, image }) {
  return (
    <IonCard className="weather-card">
      {image && <IonImg src={image} alt={title} className="product-image" />}
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Details:</strong> {description}</p>
      </IonCardContent>
    </IonCard>
  );
}

export default WeatherCard;
