function TriggerNUIEvent(eventName, attach)
    SendNUIMessage(json.encode({ eventName = eventName, attach = attach }))
end

function CloseUi()
    TriggerNUIEvent(EventNUiNames.HideAll)
end
