items = {}
items.data = {}
function SyncItemsData(broadcast)
    local result = Querys.FetchItems()
    items.data = result
end

CreateThread(function()
    SyncItemsData()
end)
