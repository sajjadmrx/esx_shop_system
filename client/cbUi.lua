RegisterNuiCallback("close", function(n, cb)
    SetNuiFocus(false, false)
    cb({ success = true })
end)
RegisterNuiCallback('buy', function(data, cb)
    ESX.TriggerServerCallback(ServerCallBackEnum.BUY, function(responseData)
        local response = json.decode(json.encode(responseData));
        if response.success then
            CloseUi()
            cb(response)
            return;
        end

        ESX.ShowHelpNotification(response.message)
    end, data)
end)

RegisterNuiCallback("item:remove", function(data, cb)
    ESX.TriggerServerCallback(ServerCallBackEnum.REMOVE_ITEM, function(response)
        cb(response)
    end, data)
end)

RegisterNuiCallback("item:add", function(data, cb)
    ESX.TriggerServerCallback(ServerCallBackEnum.ADD_ITEM, function(response)
        cb(response)
    end, data)
end)


RegisterNuiCallback("item:update", function(data, cb)
    ESX.TriggerServerCallback(ServerCallBackEnum.UPDATE_ITEM, function(response)
        cb(response)
    end, data)
end)
