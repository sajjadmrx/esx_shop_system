function TriggerNUIEvent(eventName, item)
    SendNUIMessage(json.encode({ eventName = eventName, item }))
end
