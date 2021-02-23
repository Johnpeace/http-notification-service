# PRODUCTION CONFIG
FROM node as prod
WORKDIR /usr/src/pangaea-subscriber-service
COPY package*.json ./
RUN yarn 
COPY . .
ENV NODE_ENV=production
CMD [ "yarn", "start" ]

# DEVELOPMENT CONFIG
FROM prod as dev
EXPOSE 3001
ENV NODE_ENV=development
RUN yarn --only=dev
CMD ["yarn", "start:subscriber"]