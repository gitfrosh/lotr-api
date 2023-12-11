# Contribute to The One API

## Welcome 

With Version 2, this Open Source project is now open for contribution! You can help by improving the documentation, submitting bug reports & feature requests, writing code or enhancing the actual API data.

## Getting started with Code contribution

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/gitfrosh/lotr-api.git`

### Dependencies

- install Docker - see [Rancher Desktop](https://rancherdesktop.io/)
- populate the database files locally - from the command line in the project root directory, run:
```
make mongo-data
```
- build and run the node command line image to install the packages for both the backend and frontend apps:
```
make cli-build
make cli
user@abc123:/app$ cd backend
user@abc123:/app/backend$ npm install
user@abc123:/app/backend$ cd ../frontend
user@abc123:/app/frontend$ npm install
user@abc123:/app/frontend$ exit
```
- build the node server image
```
make server-build
```

### Quick Start

- start all services with The One Command:
```
make up
```
- stop all services with The (Other) One Command:
```
make down
```
- for managing and accessing services individually, continue reading below

### Start Mongo DB service

- run a container of the [Mongo docker image](https://hub.docker.com/_/mongo) with the local database files mounted as a volume:
```
make mongo
```
- access the mongo command line on the running container:
```
make mongo-cli
```
- the database files are stored in `./docker/db/` - to restore from the original, stop any running mongo container, delete that directory, and rerun the data restore command:
```
make mongo-stop
sudo rm -rf ./docker/db
make mongo-data
```

### Start Node / Express backend

- run the node server:
```
make server
```
- to manage node packages, run the CLI:
```
make cli
user@abc123:/app$ cd backend
user@abc123:/app/backend$ npm outdated
```
- if you want to watch the nodemon output as changes are made to application files, follow the container logs:
```
docker container logs -f lotr_server
```

### Start React frontend

- run the app service:
```
make app
```
- to manage node packages, run the CLI:
```
make cli
user@abc123:/app$ cd frontend
user@abc123:/app/frontend$ npm outdated
```
- if you want to watch the webpack output as changes are made to application files, follow the container logs:
```
docker container logs -f lotr_app
```

### Create a user
- navigate to http://localhost:3000 and sign up
- use your favorite Mongo client to access user documents and get your new access_token for using the secured APIs
- OR login with your credentials in the Frontend to get your token

### Running tests

- run the CLI, navigate to the specific project (*backend* or *frontend*), and execute `npm test`:
```
make cli
user@abc123:/app$ cd backend
user@abc123:/app/backend$ npm test
```

### **HACK AWAY!** 🔨🔨🔨

### 🔃 Create a new pull request 
- using <a href="https://github.com/gitfrosh/lotr-api/compare" target="_blank">`https://github.com/gitfrosh/lotr-api/compare`</a>.


## Getting started with Data Improvement / Enhancement

The API data is far from perfect: There might be spelling mistakes, duplicates, wrong or missing data. You are very welcome to fix data to be included in the next release!

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/gitfrosh/lotr-api.git`

- move into the database folder `cd db/csv`
- make your improvements in one of the data CSV files
- 🔃 Create a new pull request using <a href="https://github.com/gitfrosh/lotr-api/compare" target="_blank">`https://github.com/gitfrosh/lotr-api/compare`</a>.
