FROM node:18

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env","prisma","src", "./"]

COPY ./src ./src

RUN npm install

RUN npm i concurrently

RUN npx prisma generate

EXPOSE 8080

CMD npm run dev
