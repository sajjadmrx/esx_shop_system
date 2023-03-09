import { useEffect } from 'react';
import { messageHandler } from '../../handlers/message.handler';
import { currentActionContext } from '../../contexts/action.context';
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import React from 'react';
import { UserMenuComponent } from './user.menu';
export function MenusComponents() {
    const currentActionContextData = React.useContext<CurrentActionContext>(currentActionContext)
    useEffect(() => { messageHandler(currentActionContextData) }, [])
    return (
        <div>
            <UserMenuComponent />
        </div>
    )
}