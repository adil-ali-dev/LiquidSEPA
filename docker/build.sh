
docker build --network="host" -t build-rollthecoin-ui .
docker rm builder-rollthecoin
docker run -v ~/nginx/www/rollthecoin/:/build/build  --network='bridge' --name builder-rollthecoin-ui build-rollthecoin-ui:latest 
