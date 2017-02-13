#!/bin/bash

yum -y update
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install gcc-c++ make nodejs nginx
