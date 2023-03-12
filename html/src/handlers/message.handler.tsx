import { EventsName } from "../constants/eventsName";
import { CurrentActionContext } from '../interfaces/contexts.interface';

interface EventData {
    eventName: string
}
export function messageHandler(curentActionContext: CurrentActionContext) {

    function handleMessage(event: any) {
        if (event.data && typeof event.data == "string") {
            try {
                const data: EventData = JSON.parse(event.data)
                switch (data.eventName) {
                    case EventsName.OPEN_MENU: curentActionContext.setCurrentAction(EventsName.OPEN_MENU)
                        break;
                    case EventsName.HIDE_ALL: curentActionContext.setCurrentAction(null)
                        break;
                    case EventsName.OPEN_ADMIN_MENU: curentActionContext.setCurrentAction(EventsName.OPEN_ADMIN_MENU)
                }
            } catch (error) {

            }
        }
    }
    window.addEventListener('message', handleMessage);

    return () => {
        window.removeEventListener('message', handleMessage);
    };
}