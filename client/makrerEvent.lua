CreateThread(function()
    while true do
        local Sleep = 1500
        if currentAction then
            Sleep = 0
            if IsControlJustReleased(0, 38) and currentAction == 'shop_menu' then
                currentAction = nil;
                ESX.HideUI()
                print([[Opened shop_menu]])
                ESX.ShowNotification("Shop")
                -- show Ui
            end
        end
        local playerCoords = GetEntityCoords(PlayerPedId())
        local isInMarker, currentZone = false, nil

        for key, value in pairs(Config.Zones) do
            for i = 1, #value.Pos, 1 do
                local distance = #(playerCoords - value.Pos[i])

                if distance < Config.DrawDistance then
                    Sleep = 0

                    if value.ShowMarker then
                        DrawMarker(Config.MarkerType, value.Pos[i], 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, Config.MarkerSize.x,
                            Config.MarkerSize.y, Config.MarkerSize.z, Config.MarkerColor.r, Config.MarkerColor.g,
                            Config.MarkerColor.b, 100, false, true, 2, false, nil, nil, false)
                    end

                    if distance < 2.0 then
                        isInMarker = true
                        currentZone = key
                        lastZone = key
                    end
                end
            end
        end
        if isInMarker and not hasAlreadyEnteredMarker then
            hasAlreadyEnteredMarker = true
            TriggerEvent('esx_shop_system:hasEnteredMarker', currentZone)
            ESX.TextUI(currentActionMsg)
        end

        if not isInMarker and hasAlreadyEnteredMarker then
            hasAlreadyEnteredMarker = false
            ESX.HideUI()
            TriggerEvent('esx_shop_system:hasExitedMarker', lastZone)
        end
        Wait(Sleep)
    end
end)
