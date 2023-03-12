items = {}
items.data = {}
function SyncItemsData()
    CreateThread(function()
        local result = Querys.FetchItems()
        items.data = result
    end)
end

SyncItemsData()
