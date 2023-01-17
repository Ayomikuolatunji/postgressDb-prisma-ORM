FROM node:18 as development 

# Create app directory
WORKDIR /src
COPY package*.json ./



ENV NODE_ENV=development
RUN npm install
RUN npm install concurrently

COPY . .
EXPOSE 8080
CMD [ "npm", "run", "dev" ]