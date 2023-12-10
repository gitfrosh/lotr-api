mongo-data:
	docker run -v ./db/bson:/var/local -v ./docker/db:/data/db --name lotr_data_restore --rm -d mongo:7.0-jammy
	docker exec -it lotr_data_restore mongorestore -d lotr --verbose /var/local
	docker container stop lotr_data_restore
mongo:
	docker run -v ./docker/db:/data/db -d --rm --name lotr_mongo mongo:7.0-jammy
mongo-cli:
	docker exec -it lotr_mongo mongosh "mongodb://localhost:27017/lotr"
mongo-stop:
	docker container stop lotr_mongo

cli-build:
	docker build --build-arg "USER_ID=$$(id -u)" --build-arg "GROUP_ID=$$(id -g)" -t lotr_cli:1.0.0 - < ./docker/cli.dockerfile
cli:
	docker run -v ./backend:/app -it --rm --name lotr_cli lotr_cli:1.0.0

server-build:
	docker build -f ./docker/server.dockerfile -t lotr_server:1.0.0 backend
server:
	docker run -v ./backend:/app -p 3001:3001 -d --rm --name lotr_server lotr_server:1.0.0

up:
	make mongo
	make server
down:
	docker container stop lotr_server
	make mongo-stop
