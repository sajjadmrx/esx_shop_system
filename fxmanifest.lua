fx_version 'adamant'
game 'gta5'
author 'test'
version '1.0.0'
description 'manage shop'
lua54 'yes'
shared_script '@es_extended/imports.lua'

ui_page('/client/ui/index.html')

files({
    '/client/ui/index.html',
    '/client/ui/**/*.js',
})

client_scripts({
    '/client/ui/index.html',
    '/client/ui/**/*.js',
})
