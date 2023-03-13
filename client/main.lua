currentAction, lastZone, hasAlreadyEnteredMarker = nil, nil, false
currentActionMsg, currentActionData = 'N/A', {}
items = {}
items.data = {}

ESX.TriggerServerCallback(ServerCallBackEnum.FETCH_ITEMS, function(data)
    items.data = data
end)
