# php
wampserver resource directory

# create database
1. startup Navicat Premium 15
2. connect domain: 127.0.0.1, username: root, password: ''(empty)
3. query with sql: create database db1 charset utf8;
4. import with sql file if necessary

# set domain
## httpd-vhost.conf
1. directory: C:/wamp64/bin/apache/apache2.4.51/conf/extra
2. referrence ./httpd-vhost.conf to modify used httpd-vhost.conf

## hosts
1. directory: C:/Windows/System32/drivers/etc
2. referrence ./hosts to modify used hosts

## perhaps problem
1. overideAllowOverride All: delete this line
2. can not access: change domain test again(domain perhaps is used)
3. startup failure: httpd-vhost.conf has error
4. others: reinstall is a good idea

## use php in commandline
add env with: C:/wamp64/bin/php/php8.0.13(php8.0.13 is version directory)
