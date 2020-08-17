# Contribute to The One API

## Welcome 

With Version 2, this Open Source project is now open for contribution! You can help by improving the documentation, submitting bug reports & feature requests, writing code or enhancing the actual API data.

## Getting started with Code contribution

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/gitfrosh/lotr-api.git`

### Start Mongo DB service

- you'll need docker & docker-compose installed on your machine
- start the service with `docker-compose up mongodb`
- fill your MongoDB container with existing API data with `docker-compose up restore`

### Start Node / Express backend

- move into the backend folder `cd backend`
- install packages with `npm install` is required
- get your express server started with `node server.js` on localhost:3001

### Start React frontend

- move into the frontend folder `cd frontend`
- get your development server started with `npm run dev` on localhost:3000
- **HACK AWAY!** 🔨🔨🔨

- 🔃 Create a new pull request using <a href="https://github.com/gitfrosh/lotr-api/compare" target="_blank">`https://github.com/gitfrosh/lotr-api/compare`</a>.


## Getting started with Data Improvement / Enhancement

The API data is far from perfect: There might be spelling mistakes, duplicates, wrong or missing data. You are very welcome to fix data to be included in the next release!

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/gitfrosh/lotr-api.git`

- move into the database folder `cd db`
- make your improvements in one of the data CSV files
- 🔃 Create a new pull request using <a href="https://github.com/gitfrosh/lotr-api/compare" target="_blank">`https://github.com/gitfrosh/lotr-api/compare`</a>.