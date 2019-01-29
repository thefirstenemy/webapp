cd server
docker run --rm -v server -w /server node:slim sh -c 'apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install' 
docker run -it -p 3000:3000 --rm --name server server | cd client
docker build client . 
docker run  -p 8080:8080 --rm --name client client