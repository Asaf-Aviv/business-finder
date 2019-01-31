import React, { useState, useEffect } from 'react';

import './App.sass';
import SearchBar from './SearchBar';

const App = () => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          console.log(coords);
          setUserLatitude(coords.latitude);
          setUserLongitude(coords.longitude);
        },
      );
    }
  }, []);

  return (
    <SearchBar />
  );
};


export default App;
