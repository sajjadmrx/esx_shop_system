function broadcastUpdateItems()
    TriggerClientEvent(ServerCallBackEnum.FETCH_ITEMS, -1, items.data)
end
