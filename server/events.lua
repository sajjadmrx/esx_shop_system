ESX.RegisterServerCallback(ServerCallBackEnum.FETCH_ITEMS, function(source, cb)
    cb(items.data)
end)

ESX.RegisterServerCallback(ServerCallBackEnum.BUY, function(source, cb, data)
    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)

    local cartData = json.decode(json.encode(data))
    local price = calculateTotalPrice(cartData)
    local playerMoney = xPlayer.getMoney()
    if playerMoney < price then
        cb({ success = false, message = "You don't have enough money." })
        return;
    end
    for i = 1, #cartData, 1 do
        local productInCart = cartData[i]
        local product = Finder(items.data, 'key', productInCart.key)

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
    playerMoney = playerMoney - price;

    xPlayer.setMoney(playerMoney)

    cb({ success = true })
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
