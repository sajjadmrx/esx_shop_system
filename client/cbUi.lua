RegisterNuiCallback("close", function()
    SetNuiFocus(false, false)
end)
RegisterNuiCallback('buy', function(data, cb)
    ESX.TriggerServerCallback(ServerCallBackEnum.BUY, function(responseData)
        local response = json.decode(json.encode(responseData));
        if response.success then
            CloseUi()
            return;
        end

        ESX.ShowHelpNotification(response.message)
    end, data)
end)
