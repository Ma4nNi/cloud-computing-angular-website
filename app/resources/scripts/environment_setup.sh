#!/bin/bash

echo "Installing pip for python 3"
sudo apt-get install python3-pip

echo "isntalling aws cli"
pip3 install --upgrade --user awscli

echo "installing nodejs"
sudo apt-get install nodejs


echo "installing npm"
sudo apt install npm


echo "installing grunt"
sudo npm install -g grunt-cli

echo "installing gulp"
sudo npm install -g gulp-cli

echo "installing git"
sudo apt-get install git


echo "installing yeoman"
sudo npm install -g yo
