# Contribute to The One API

## Welcome 

With Version 2, this Open Source project is now open for contribution! You can help by improving the documentation, submitting bug reports & feature requests, writing code or enhancing the actual API data.

## Getting started with Code contribution

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/gitfrosh/lotr-api.git`

### Start Mongo DB service

- you'll need MongoDB Community Edition running on your machine, listening on default port 27017
- start a shell and restore LotR data with `mongorestore -d lotr --verbose ./db/bson`

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