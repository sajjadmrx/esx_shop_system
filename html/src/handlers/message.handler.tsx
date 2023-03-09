import { EventsName } from "../constants/eventsName";
import { CurrentActionContext } from "../interfaces/contexts.interface";

interface EventData {
    eventName: string
}
export function messageHandler(cuurentActionContext: CurrentActionContext) {

    function handleMessage(event: any) {
        const data: EventData = JSON.parse(event.data)
        switch (data.eventName) {
            case EventsName.OPEN_MENU: cuurentActionContext.setCurrentAction(EventsName.OPEN_MENU)
                break;
            case EventsName.HIDE_ALL: cuurentActionContext.setCurrentAction(null)
                break;
        }
    }
    window.addEventListener('message', handleMessage);

    return () => {
        window.removeEventListener('message', handleMessage);
    };
}