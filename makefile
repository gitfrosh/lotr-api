# build the command line interface and install node packages
build:
	docker build --build-arg "USER_ID=$$(id -u)" --build-arg "GROUP_ID=$$(id -g)" -f ./docker/dockerfile --target lotr_cli -t lotr-cli:latest .
	docker run -v ${PWD}/backend:/app/backend -v ${PWD}/frontend:/app/frontend --entrypoint /app/npm-build.sh -it --rm --name lotr-cli lotr-cli

# start and stop the local environment
up:
	docker compose -f docker/compose.yml up
down:
	docker compose -f docker/compose.yml down

# run the command line interface to manage application dependencies and run tests
cli:
	docker run -v ${PWD}/backend:/app/backend -v ${PWD}/frontend:/app/frontend -it --rm --name lotr-cli lotr-cli
