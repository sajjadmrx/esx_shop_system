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
---@return boolean
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

---@param key string
---@param item table
---@return boolean
Querys.Update = function(key, item)
    local queries = {
        'UPDATE items set name=:name,label=:label WHERE name=:key',
        'UPDATE shop_items set price=:price,offer=:offer WHERE `key`=:newkey'
    }
    local parameters = {
        ['name'] = item.key,
        ['key'] = key,
        ['label'] = item.label,
        ['weight'] = item.weight,
        ['price'] = item.price,
        ['offer'] = item.offer,
        ['newkey'] = item.key
    }
    local success = MySQL.transaction.await(queries, parameters)
    return success
end

---@param key string
---@return number
Querys.Delete = function(key)
    local resJson = MySQL.query.await(
        "DELETE FROM shop_items WHERE `key`=?",
        { key })
    local response = json.decode(json.encode(resJson))
    return response.affectedRows
end
