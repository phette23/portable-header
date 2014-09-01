#! /usr/bin/env bash
# get latest code from master
git checkout master -- app/* Gruntfile.js
# build
grunt build
# put build into root
cp -r build/* .
# commit & push
git commit -am "merge changes from master"
git push
