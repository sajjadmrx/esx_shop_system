AddEventHandler("esx_shop_system:hasEnteredMarker", function(zone)
    currentAction = "shop_menu"
    currentActionMsg = TranslateCap("open_menu", "E")
    currentActionData = { zone = zone }
end)


AddEventHandler("esx_shop_system:hasExitedMarker", function(zone)
    currentAction = nil
    TriggerNUIEvent(EventNUiNames.HideAll)
end)
