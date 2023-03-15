function CalculateTotalPrice(cart)
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
