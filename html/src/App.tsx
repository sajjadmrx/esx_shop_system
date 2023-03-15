import React, { useEffect } from 'react';
import './App.css';

import { MenusComponents } from './components/menus';
import { currentActionContext } from './contexts/action.context';
import { EventsName } from './constants/eventsName';
import { apiService } from './services/service';



function App() {
  const [currentAction, setCurrentAction] = React.useState<string | null>(null)
  const [attach, setAttach] = React.useState<any>(null)
  useEffect(() => {
    async function close() {
      await apiService.closeUi()
    }
    if (currentAction == null)
      close()


  }, [currentAction])
  return (
    <div hidden={currentAction == null}>
      <currentActionContext.Provider value={{ currentAction, setCurrentAction, attach, setAttach }}>
        <MenusComponents />
      </currentActionContext.Provider>
    </div>
  );
}

export default App;
