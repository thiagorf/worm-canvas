FROM node:16.16.0-alpine as development

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm ci

COPY . .

USER node


FROM node:16.16.0-alpine as build


COPY --from=development /usr/app .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node


FROM node:16.16.0-alpine as production

COPY --from=build ./node_modules ./node_modules
COPY --from=build ./dist ./dist

FROM nginx:1.15.8-alpine as nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=production ./dist /etc/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]