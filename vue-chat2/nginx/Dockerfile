#FROM node:14.0.0-alpine3.11 as build-stage
FROM node:lts-alpine as build-stage
RUN yarn global add http-server

WORKDIR /app
COPY app/vue-chat/package*.json ./
#COPY app/vue-chat/yarn.lock ./
RUN yarn install
COPY app/vue-chat/ ./
RUN yarn run build

FROM nginx:1.17.10-alpine as production-stage

RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
