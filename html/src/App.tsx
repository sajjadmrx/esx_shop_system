import React, { useEffect } from 'react';
import './App.css';


import { MenusComponents } from './components/menus';
import { currentActionContext } from './contexts/action.context';
import { EventsName } from './constants/eventsName';


function App() {
  const [currentAction, setCurrentAction] = React.useState<string | null>(EventsName.OPEN_MENU)
  useEffect(() => {
    if (currentAction == null) {
      fetch("https://shop_system/close", { method: "POST" })
        .then(() => console.log("done"))
        .catch(console.log)
    }
  }, [currentAction])
  return (
    <div hidden={currentAction == null}>
      <currentActionContext.Provider value={{ currentAction, setCurrentAction }}>
        <MenusComponents />
      </currentActionContext.Provider>
    </div>
  );
}

export default App;
