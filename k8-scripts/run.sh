#!/bin/bash
echo Start of K8 Setup For candidate.API

kubectl create secret generic candidate-secret --from-literal=MONGODB_SERVER=$1 --from-literal=MONGODB_SERVER_PORT=$2 --from-literal=MONGODB_DB=$3 --from-literal=MONGODB_DB_USER=$4 --from-literal=MONGODB_DB_PASS=$5
kubectl apply -f ./candidate-deployment.yaml
kubectl apply -f ./candidate-service.yaml

echo End of K8 Setup For candidate.API
