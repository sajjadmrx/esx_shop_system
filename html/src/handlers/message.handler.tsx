import { EventsName } from "../constants/eventsName";
import { CurrentActionContext } from '../interfaces/contexts.interface';

interface EventData<M> {
    eventName: string
    attach: M
}
export function messageHandler(curentActionContext: CurrentActionContext) {

    function handleMessage(event: any) {
        if (event.data && typeof event.data === "string") {
            try {
                const data: EventData<any> = JSON.parse(event.data)
                switch (data.eventName) {
                    case EventsName.OPEN_MENU: curentActionContext.setCurrentAction(EventsName.OPEN_MENU)
                        break;
                    case EventsName.HIDE_ALL: curentActionContext.setCurrentAction(null)
                        break;
                    case EventsName.OPEN_ADMIN_MENU: curentActionContext.setCurrentAction(EventsName.OPEN_ADMIN_MENU)
                }
                if (data.attach)
                    curentActionContext.setAttach(data.attach)

            } catch (error) {

            }
        }
    }
    window.addEventListener('message', handleMessage);

    return () => {
        window.removeEventListener('message', handleMessage);
    };
}