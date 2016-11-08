#!/bin/bash
cd /home/ec2-user/teamform-seed/
npm install --only=dev
npm install --only=prod
npm run build

./node_modules/.bin/forever start /home/ec2-user/teamform-seed/app.js
