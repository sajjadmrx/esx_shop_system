function TriggerNUIEvent(eventName, attach)
    SendNUIMessage(json.encode({ eventName = eventName, attach = attach }))
end

function CloseUi()
    TriggerNUIEvent(EventNUiNames.HideAll)
end

function OpenUi(name, attach)
    TriggerNUIEvent(name, attach)
    SetNuiFocus(true, true)
end
