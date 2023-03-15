ESX.RegisterServerCallback(ServerCallBackEnum.FETCH_ITEMS, function(source, cb)
    cb(items.data)
end)

ESX.RegisterServerCallback(ServerCallBackEnum.BUY, function(source, cb, data)
    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)

    data = json.decode(json.encode(data))
    local cartData = data.cartData
    local price = calculateTotalPrice(cartData)
    local playerMoney = xPlayer.getMoney()
    local playerBank = xPlayer.getAccount('bank').money
    local method = data.method

    if method == "CASH" then
        if playerMoney < price then
            cb({ success = false, message = "You don't have enough money." })
            return;
        end
    else
        if playerBank < price then
            cb({ success = false, message = "You have enough money in your bank account." })
            return;
        end
    end

    for i = 1, #cartData, 1 do
        local productInCart = cartData[i]
        local product = Finder(items.data, 'key', productInCart.key)
        if productInCart.total > 20 then
            cb({ success = false, message = "The number is exceeded. " })
            return;
        end
        if not product then
            cb({ success = false, message = "invalid item" })
            return;
        end

        if product.price ~= productInCart.price then
            cb({ success = false, message = "invalid request" })
            return;
        end

        xPlayer.addInventoryItem(product.key, productInCart.total)
    end
    if method == "CASH" then
        playerMoney = playerMoney - price;
        xPlayer.setMoney(playerMoney)
    else
        playerBank = playerBank - price
        xPlayer.setAccountMoney('bank', playerBank)
    end

    cb({ success = true })
end)

ESX.RegisterServerCallback(ServerCallBackEnum.ADD_ITEM, function(source, cb, data)
    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    CreateThread(function()
        if xPlayer.getGroup() ~= 'admin' then
            cb({ message = "ACCESS DENIED", success = false })
            return;
        end

        local item = json.decode(json.encode(data))
        local isSuccess = false
        if item.label and item.weight then
            isSuccess = Querys.InsertToItems(item)
        else
            isSuccess = Querys.Insert(item)
        end
        if isSuccess then
            SyncItemsData()
            cb({ success = true, attach = items.data })
            broadcastUpdateItems()
        else
            cb({ success = false })
        end
    end)
end)

ESX.RegisterServerCallback(ServerCallBackEnum.REMOVE_ITEM, function(source, cb, data)
    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer.getGroup() ~= 'admin' then
        cb({ message = "ACCESS DENIED", success = false })
        return;
    end
    CreateThread(function()
        local item = json.decode(json.encode(data))
        local isSuccess = false

        local resp = Querys.Delete(item.key)
        if resp == 1 then
            isSuccess = true
        end
        if isSuccess then
            SyncItemsData()
            cb({ success = true, attach = items.data })
            broadcastUpdateItems()
        else
            cb({ success = false })
        end
    end)
end)

ESX.RegisterServerCallback(ServerCallBackEnum.UPDATE_ITEM, function(source, cb, data)
    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer.getGroup() ~= 'admin' then
        cb({ message = "ACCESS DENIED", success = false })
        return;
    end
    CreateThread(function()
        local item = json.decode(json.encode(data))
        local isSuccess =
            Querys.Update(item.key, item.data)
        if isSuccess then
            SyncItemsData()
            cb({ success = true, attach = items.data })
            broadcastUpdateItems()
        else
            cb({ success = false })
        end
    end)
end)

function calculateTotalPrice(cart)
    local totalPrice = 0
    for i = 1, #cart do
        local product = cart[i]
        local price = product.price
        if product.total then
            price = price * product.total
        end
        local discount = (product.offer or 0) / 100
        totalPrice = totalPrice + price - price * discount
    end
    return math.floor(totalPrice)
end
