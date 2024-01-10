FROM node:lts-slim

WORKDIR /api

ENV NODE_ENV production

ENV PORT 3001

EXPOSE 3001

COPY . .

RUN npm install -g @nestjs/cli

RUN npm ci

RUN npm run build

CMD [ "npm", "run", "start:prod" ]