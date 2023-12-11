FROM node:21.2-alpine

WORKDIR /app

EXPOSE 3000

CMD [ "npm", "run", "start" ]
