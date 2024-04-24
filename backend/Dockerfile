FROM node:21.2

WORKDIR /app

# Copy package.json and package-lock.json if it exists
COPY package.json .

RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
