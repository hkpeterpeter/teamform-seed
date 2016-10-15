#!/bin/bash

cd /home/ec2-user/teamform-seed/
npm install
sudo npm install forever bower -g
npm run build

sudo forever start /home/ec2-user/teamform-seed/app.js
