ESX.RegisterCommand("mg_shop", { Config.Role }, function(xPlayer)
    TriggerClientEvent(EventNUiNames.OPEN_ADMIN_MENU, xPlayer.source)
end, true)
