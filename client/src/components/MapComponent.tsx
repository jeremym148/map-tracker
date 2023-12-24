import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define props types
type MapComponentProps = {
  ballPosition: { lat: number; lng: number };
  goalPosition: { lat: number; lng: number };
};

const MapComponent: React.FC<MapComponentProps> = ({ ballPosition, goalPosition }) => {
  // Define custom icons
  const ballIcon = new L.Icon({
    iconUrl: '/ball.png',
    iconSize: [25, 25]
  });

  const goalIcon = new L.Icon({
    iconUrl: '/goal.png',
    iconSize: [25, 25]
  });

  return (
    <MapContainer center={ballPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={ballPosition} icon={ballIcon} />
      <Marker position={goalPosition} icon={goalIcon} />
    </MapContainer>
  );
};

export default MapComponent;
