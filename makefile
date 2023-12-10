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
up:
	make mongo
down:
	make mongo-stop
