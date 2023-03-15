items.findById = function(id)
    return Finder(items.data, 'id', id)
end

items.findByKey = function(key)
    return Finder(items.data, 'key', key)
end
