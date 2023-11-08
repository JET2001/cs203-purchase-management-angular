#!/bin/bash
ng build --configuration=production --aot 
aws s3 cp ./dist s3://cs203-g4-team4-ticket-purchase-angular.com --recursive