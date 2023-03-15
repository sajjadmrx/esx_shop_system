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
