# Express-api

![Nodejs](https://www.seeklogo.net/wp-content/uploads/2015/09/nodejs-logo-vector-download-200x200.jpg)
Nodejs Express API written in node 12 + Dockerfile and deployment.yaml

## Installation & Usage

node server.js

docker build -t candidate-api:v1.0.0 . 

docker run -p 3000:3000 --env NODE_ENV=development --env PORT=3000 --env MONGODB_SERVER=127.0.0.1 --env MONGODB_SERVER_PORT=27017 --env MONGODB_DB=some_db --env MONGODB_DB_USER=some_user --env MONGODB_DB_PASS=password --env UPLOAD_FOLDER=some_folder_name candidate-api:v1.0.0

or run 

./run.sh 127.0.0.1 27017 some_db some_user password


kubectl apply -f deployment.yaml

### Software
    OS              Alpine
    Runtime         NodeJS
