function TriggerNUIEvent(eventName)
    SendNUIMessage(json.encode({ eventName = eventName }))
end
