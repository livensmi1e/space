FROM node:23-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.27.3-alpine
COPY --from=build ./app/dist /usr/share/nginx/html
EXPOSE 80