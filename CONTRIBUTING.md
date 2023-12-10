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

- move into the backend folder `cd backend`
- install packages with `npm install`
- get your express server started with `node server.js` on localhost:3001

### Start React frontend

- move into the frontend folder `cd frontend`
- install packages with `npm install`
- get your development server started with `npm start` on localhost:3000

### Create a user
- navigate to http://localhost:3000 and sign up
- use your favorite Mongo client to access user documents and get your new access_token for using the secured APIs
- OR login with your credentials in the Frontend to get your token

### Running tests

- navigate to the specific project (*backend* or *frontend*) and execute `npm test`.

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
