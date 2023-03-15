CreateThread(function()
    for key, value in pairs(Config.Zones) do
        for i = 1, #value.Pos, 1 do
            if value.ShowBlip then
                local blip = AddBlipForCoord(value.Pos[i])

                SetBlipSprite(blip, value.Type)
                SetBlipScale(blip, value.Size)
                SetBlipColour(blip, value.Color)
                SetBlipAsShortRange(blip, true)

                BeginTextCommandSetBlipName("STRING")
                AddTextComponentSubstringPlayerName(TranslateCap("shop"))
                EndTextCommandSetBlipName(blip)
            end
        end
    end
end)
