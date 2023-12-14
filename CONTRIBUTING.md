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
- build and run the node command line image, which will automatically install the packages for both the backend and frontend apps:
```
make build
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

### Mongo DB service

- access the mongo command line on the running container:
```
docker exec -it lotr-mongo-1 mongosh
test> use lotr
lotr>
```
- the database files are stored in `./docker/db/` - to restore from the original, stop the running containers, delete that directory, and bring the environment back up:
```
make down
sudo rm -rf ./docker/db
make up
```

### Node / Express backend

- to manage node packages, run the CLI:
```
make cli
user@abc123:/app$ cd backend
user@abc123:/app/backend$ npm outdated
```
- if you want to watch the nodemon output as changes are made to application files, follow the container logs:
```
docker container logs -f lotr-backend-1
```

### React frontend

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
