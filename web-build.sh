#!/bin/bash
npm i
npm i pm2
npm run build:ssr
pm2 stop all
pm2 start dist/server.js