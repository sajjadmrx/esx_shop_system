local esx_shopsState = GetResourceState("esx_shops")
if esx_shopsState ~= 'stopped' then
    print([[please stop using {esx_shops} resource.]])
    StopResource("esx_shops")
end
