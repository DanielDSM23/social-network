FROM node:23-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 4000

CMD [ "npm","run", "dev" ]