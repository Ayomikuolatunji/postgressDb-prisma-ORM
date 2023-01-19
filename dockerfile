FROM node:18

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

run npm i concurrently

EXPOSE 8080

CMD npm run dev
