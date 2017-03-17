#!/bin/bash

git commit -am 'auto-commit before update gh-pages';
npm run build && git checkout gh-pages;
mkdir dest/ 2> /dev/null;
cp dist/* dest/;
sed -i '' -ne 's!../dist/!../dest/!;p' examples/index.html;
git add .
git commit -m 'auto update gh-pages'
git push;
git checkout master;
