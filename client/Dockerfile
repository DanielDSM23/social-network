FROM node:23-alpine3.20 AS builder

WORKDIR /app
ENV REACT_APP_API = "http://api:4000/";
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.4-alpine-otel

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf