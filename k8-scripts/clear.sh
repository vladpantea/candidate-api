#!/bin/bash
echo Start clear Resources for candidate.API

kubectl delete secret candidate-secret
kubectl delete deployments candidate-api
kubectl delete svc candidate-service

echo Done Clear Resources for candidate.API