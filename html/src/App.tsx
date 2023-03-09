import React, { useEffect } from 'react';
import './App.css';


import { MenusComponents } from './components/menus';
import { currentActionContext } from './contexts/action.context';

function App() {
  const [currentAction, setCurrentAction] = React.useState<string | null>(null)
  return (
    <div>
      <currentActionContext.Provider value={{ currentAction, setCurrentAction }}>
        <MenusComponents />
      </currentActionContext.Provider>
    </div>
  );
}

export default App;
