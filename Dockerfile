# FROM node:14.15.4-alpine3.12

# RUN npm install -g @nestjs/cli@8.0.0

# USER node

# WORKDIR /home/node/app


FROM node:14.15.4-alpine3.12

RUN apk --no-cache upgrade && apk add --no-cache chromium
RUN apk add --no-cache bash
RUN apk add --no-cache nano

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

#RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm i -g @nestjs/cli@7.5.1

#USER node

WORKDIR /home/node/app