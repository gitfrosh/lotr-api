FROM node:21.2-alpine

WORKDIR /app

# Copy package.json and package-lock.json if it exists
COPY package.json .

RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
