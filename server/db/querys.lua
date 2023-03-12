Querys = {}

Querys.FetchItems = function()
    return MySQL.query.await("SELECT * FROM `shop_items`")
end

---@param id number
Querys.FetchItemById = function(id)
    local items = MySQL.query.await("SELECT * FROM shop_items WHERE id=?", { id })
    return items[1]
end


---@param key string
Querys.FetchItemByKey = function(key)
    local items = MySQL.query.await("SELECT * FROM shop_items WHERE `key`=?", { key })
    return items[1]
end


---@param item table
Querys.InsertItem = function(item)
    MySQL.prepare("INSERT INTO shop_items (`key`,`label`,`weight`,`price`,`offer`) VALUES (?,?,?,?,?)",
        { item.key, item.label, item.weight, item.price, item.offer or 0 })
end

---@param id number
---@param item table
---@return number
Querys.Update = function(id, item)
    local resJson = MySQL.query.await(
        "UPDATE shop_items SET `key` = ?, `label` = ?, `weight` = ?, `price` = ?, `offer` = ? WHERE `id` = ?",
        { item.key, item.label, item.weight, item.price, item.offer or 0, id })
    local response = json.decode(json.encode(resJson))
    return response.affectedRows
end
