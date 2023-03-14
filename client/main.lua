currentAction, lastZone, hasAlreadyEnteredMarker = nil, nil, false
currentActionMsg, currentActionData = 'N/A', {}
items = {}
items.data = {}
ESX.TriggerServerCallback(ServerCallBackEnum.FETCH_ITEMS, function(data)
    items.data = data
end)

RegisterNetEvent(ServerCallBackEnum.FETCH_ITEMS, function(data)
    items.data = data
end)

RegisterNetEvent(EventNUiNames.OPEN_ADMIN_MENU, function()
    OpenUi(EventNUiNames.OPEN_ADMIN_MENU, items.data)
end)
