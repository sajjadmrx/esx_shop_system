ESX.RegisterCommand("mg_shop", { "admin" }, function(xPlayer)
    TriggerClientEvent(EventNUiNames.OPEN_ADMIN_MENU, xPlayer.source)
end, true)
