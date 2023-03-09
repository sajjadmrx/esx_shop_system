import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => { console.log("Fetching Products...") }, [])
  return (
    <div className="App" style={{ display: "none" }}>
      Test
    </div>
  );
}

export default App;
