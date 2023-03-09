AddEventHandler("esx_shop_system:hasEnteredMarker", function(zone)
    currentAction = "shop_menu"
    currentActionMsg = "press [E]"
    currentActionData = { zone = zone }
end)


AddEventHandler("esx_shop_system:hasExitedMarker", function(zone)
    currentAction = nil
    --todo  hide UI
end)
