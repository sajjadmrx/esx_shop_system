import React from 'react';
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import { currentActionContext } from '../../contexts/action.context';
import { EventsName } from '../../constants/eventsName';
export function UserMenuComponent() {
    const currentActionContextData = React.useContext<CurrentActionContext>(currentActionContext)
    const isShow: boolean = currentActionContextData.currentAction == EventsName.OPEN_MENU
    return (
        <div hidden={!isShow}>
            <p> hello i menu</p>
        </div>
    )
}