FROM node:21.2-alpine

WORKDIR /app

RUN npm install -g nodemon

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
