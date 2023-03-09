import React, { useEffect } from 'react';
import './App.css';
import { messageHandler } from './handlers/message.handler';

function App() {
  useEffect(() => { messageHandler() }, [])
  return (
    <div className="App" style={{ display: "none" }}>

      Test
    </div>
  );
}

export default App;
