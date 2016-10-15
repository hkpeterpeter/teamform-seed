#!/bin/bash
sudo yum -y update
sudo curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
sudo yum -y install gcc-c++ make nodejs
