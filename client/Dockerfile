FROM node:20-alpine as base

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn build

EXPOSE 4173
CMD ["yarn", "preview"]