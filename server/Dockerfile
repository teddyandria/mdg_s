FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN echo "[server] -> BUILDING SERVER"
RUN echo "[server] -> RUNNING SERVER"

EXPOSE 3000

CMD npm start

