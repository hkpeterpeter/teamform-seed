#!/bin/bash

cd /home/ec2-user/teamform-seed/
npm install --only=dev
npm install --only=prod
sudo npm install forever bower rimraf webpack -g
npm run build

sudo forever start /home/ec2-user/teamform-seed/app.js
