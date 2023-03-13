ESX.RegisterServerCallback(ServerCallBackEnum.FETCH_ITEMS, function(source, cb)
    cb(items.data)
end)
