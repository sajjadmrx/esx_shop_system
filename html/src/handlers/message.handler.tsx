import { EventsName } from "../constants/eventsName";

interface EventData {
    eventName: string
}
export function messageHandler() {

    function handleMessage(event: any) {
        const data: EventData = JSON.parse(event.data)
        switch (data.eventName) {
            case EventsName.OPEN_MENU: console.log("Opened Menu Shop,.. fetching products")
        }
    }
    window.addEventListener('message', handleMessage);

    // cleanup function to remove the event listener
    return () => {
        window.removeEventListener('message', handleMessage);
    };
}