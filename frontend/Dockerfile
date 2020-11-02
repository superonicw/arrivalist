FROM node:12

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn
