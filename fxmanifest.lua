fx_version 'adamant'
game 'gta5'
author 'test'
version '1.0.0'
description 'manage shop'
lua54 'yes'


shared_script '@es_extended/imports.lua'

client_scripts({
    'config.lua',
    'shared/**/*.lua',
    'client/*.lua'
})

server_script({
    '@oxmysql/lib/MySQL.lua',
    'locales/*.lua',
    'config.lua',
    'shared/**/*.lua',
    'server/db/*.lua',
    'server/*.lua'
})

ui_page('html/build/index.html')

files({
    'html/build/static/media/*.ttf',
    'html/build/icons/*',
    'html/build/sounds/*.mp3',
    'html/build/index.html',
    'html/build/static/js/*.js',
    'html/build/static/css/*.css',
})

dependency 'es_extended'
