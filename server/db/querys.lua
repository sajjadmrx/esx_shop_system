Querys = {}

Querys.FetchItems = function()
    return MySQL.query.await("SELECT * FROM `shop_items` inner join items ON shop_items.`key` = items.name")
end

---@param id number
Querys.FetchItemById = function(id)
    local items = MySQL.query.await(
        "SELECT * FROM shop_items inner join items ON shop_items.`key` = items.name WHERE id=?", { id })
    return items[1]
end


---@param key string
Querys.FetchItemByKey = function(key)
    local items = MySQL.query.await(
        "SELECT * FROM shop_items inner join items ON shop_items.`key` = items.name WHERE `key`=?", { key })
    return items[1]
end

---@param item table
Querys.InsertToItems = function(item)
    local queries = {
        'INSERT INTO items (name, label, weight, rare, can_remove) VALUES (:name,:label,:weight,1,0);',
        'INSERT INTO shop_items (`key`,`price`,`offer`) VALUES (:key,:price,:offer);'
    }
    local parameters = {
        ['name'] = item.key,
        ['label'] = item.label,
        ['weight'] = item.weight,
        ['key'] = item.key,
        ['price'] = item.price,
        ['offer'] = item.offer
    }
    local success = MySQL.transaction.await(queries, parameters)
    return success
end

---@param item table
Querys.Insert = function(item)
    local result = MySQL.query.await("INSERT INTO shop_items (`key`,`price`,`offer`) VALUES (?,?,?)",
        { item.key, item.price, item.offer or 0 })
    return result
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
