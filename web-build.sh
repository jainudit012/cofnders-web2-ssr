#!/bin/bash
cd cofnders-web2-ssr
git pull
npm i
npm run build:ssr
pm2 stop all
pm2 start dist/server.js