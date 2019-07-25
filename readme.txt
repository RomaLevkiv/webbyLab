Install Mongodb on ubuntu v 18.04 LTS (bionic) 
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
To start the application, enter "npm start".
Application after launch can be found by URL: localhost:3000
"npm test" command runs application tests
