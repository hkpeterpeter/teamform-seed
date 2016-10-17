#!/bin/bash

cd /home/ec2-user/teamform-seed/
sudo chown -R ec2-user:ec2-user ./*
sudo cat > /etc/nginx/default.d/teamform-seed.conf << EOF
location / {
  proxy_pass http://localhost:3000/;
}
EOF
if (( $(ps -ef | grep -v grep | grep 'nginx' | wc -l) > 0 )) then
  sudo service nginx reload
else
  sudo service nginx start
fi
