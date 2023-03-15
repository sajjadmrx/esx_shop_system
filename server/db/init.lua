items = {}
items.data = {}

function SyncItemsData()
    local result = Querys.FetchItems()
    items.data = result
end

CreateThread(function()
    SyncItemsData()
end)
