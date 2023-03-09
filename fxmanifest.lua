fx_version 'adamant'
game 'gta5'
author 'test'
version '1.0.0'
description 'manage shop'
lua54 'yes'


shared_script '@es_extended/imports.lua'

client_scripts({
    'config.lua',
    'client/*.lua'
})

server_script({
    '@oxmysql/lib/MySQL.lua',
    'locales/*.lua',
    'config.lua',
    'server/*.lua'
})

ui_page('client/ui/build/index.html')

files({
    'client/ui/build/index.html',
    'client/ui/build/static/js/*.js',
})

dependency 'es_extended'
