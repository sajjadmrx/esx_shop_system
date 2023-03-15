import React, { useEffect } from 'react';
import './App.css';

import { MenusComponents } from './components/menus';
import { currentActionContext } from './contexts/action.context';
import { EventsName } from './constants/eventsName';
import { apiService } from './services/service';
import useEventListener from '@use-it/event-listener'


const ESCAPE_KEYS = ['27', 'Escape'];

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

  function Keyhandler({ key }: any) {
    if (ESCAPE_KEYS.includes(String(key))) {
      setCurrentAction(null)
    }
  }

  useEventListener('keydown', Keyhandler);

  return (
    <div hidden={currentAction == null}>
      <currentActionContext.Provider value={{ currentAction, setCurrentAction, attach, setAttach }}>
        <MenusComponents />
      </currentActionContext.Provider>
    </div>
  );
}

export default App;
