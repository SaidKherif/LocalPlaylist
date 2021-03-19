#!/bin/zsh
createdb
sudo -i -u postgres psql -c "CREATE DATABASE LocalPlaylist"