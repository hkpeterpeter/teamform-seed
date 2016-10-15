#!/bin/bash

cd /home/ec2-user/teamform-seed/
chown -R ec2-user:ec2-user ../**
npm install --only=dev
npm install --only=prod
npm install forever bower rimraf webpack -g
npm run build

sudo forever start /home/ec2-user/teamform-seed/app.js
