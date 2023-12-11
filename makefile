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
	docker run -v ./backend:/app/backend -v ./frontend:/app/frontend -it --rm --name lotr_cli lotr_cli:1.0.0

server-build:
	docker build -f ./docker/backend.dockerfile -t lotr_server:1.0.0 backend
server:
	docker run -v ./backend:/app -p 3001:3001 -d --rm --name lotr_server lotr_server:1.0.0
server-stop:
	docker container stop lotr_server

app-build:
	docker build -f ./docker/frontend.dockerfile -t lotr_app:1.0.0 frontend
app:
	docker run -v ./frontend:/app -p 3000:3000 -d --rm --name lotr_app lotr_app:1.0.0
app-stop:
	docker container stop lotr_app

up:
	make mongo
	make server
	make app
down:
	make app-stop
	make server-stop
	make mongo-stop
