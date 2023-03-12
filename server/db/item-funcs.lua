items.findById = function(id)
    return Finder(items.data, 'id', id)
end

items.findByKey = function(key)
    return Finder(items.data, 'key', key)
end

-- RegisterCommand('fetch', function()
--     CreateThread(function()
--         local item = items.findById(3)
--         if not item then
--             print([[item not found]])
--             return;
--         end
--         print(item.key, item.label)
--     end)
-- end, false)
-- RegisterCommand('update', function()
--     CreateThread(function()
--         local rowCount = Querys.Update(99, { key = 'water', label = 'aab', weight = 1.2, price = 5000, offer = 10 })
--         SyncItemsData()
--     end)
-- end, false)

function Finder(arr, tbKey, value)
    if type(arr) == "nil" then
        return nil
    end
    for i = 1, #arr, 1 do
        local elem = arr[i]
        if elem[tbKey] == value then
            return elem
        end
    end
end
