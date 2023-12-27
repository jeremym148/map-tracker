import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';

const App: React.FC = () => {
  const [ballPosition, setBallPosition] = useState({ lat: 0, lng: 0 });
  const [goalPosition, setGoalPosition] = useState({ lat: 0, lng: 0 });

  // Function to fetch goal position from the backend
  const fetchGoalPosition = async () => {
    if (ballPosition.lat === 0 && ballPosition.lng === 0 ) return;
    try {
      const params = new URLSearchParams({
        currentLat: ballPosition.lat.toString(),
        currentLng: ballPosition.lng.toString()
      });

      const response = await axios.get(`/api/goal?${params.toString()}`);
      console.log('Goal position:', response.data);
      setGoalPosition(response.data);
    } catch (error) {
      console.error('Error fetching goal position:', error);
    }
  };

  // Function to check proximity to the goal
  const checkProximity = async () => {
    try {
      const response = await axios.post('/api/check-goal', {
        current:  ballPosition,
        goal: goalPosition
      });
      console.log('isGoalReached', response.data.isGoalReached);

      if (response.data.isGoalReached) {
        alert('GOAL!');
        // Optionally reset the game or update the state as needed
      }
    } catch (error) {
      console.error('Error checking goal proximity:', error);
    }
  };

  // Real-time tracking of the user's position (simplified for example)
  const trackUserPosition = () => {
    navigator.geolocation.watchPosition((position) => {
      console.log('New position:', position);
      setBallPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
      const startGame = window.confirm('Do you want to start the game?');
      if (startGame) {
        trackUserPosition();
      }
  }, []);

  // Update goal position once we have the initial position of the ball
  useEffect(() => {
    if (ballPosition.lat !== 0 && ballPosition.lng !== 0 && goalPosition.lat === 0 && goalPosition.lng === 0) {
      fetchGoalPosition();
    }
  }, [ballPosition]);

  // Call checkProximity every time ballPosition updates
  useEffect(() => {
    if (ballPosition.lat !== 0 && ballPosition.lng !== 0 && goalPosition.lat !== 0 && goalPosition.lng !== 0) {
      checkProximity();
    }
  }, [ballPosition]);

  return (
    <div className="App">
      {ballPosition.lat !== 0 && ballPosition.lng !== 0 && goalPosition.lat !== 0 && goalPosition.lng !== 0 && (
        <MapComponent ballPosition={ballPosition} goalPosition={goalPosition} />
      )}
    </div>
  );
};

export default App;
