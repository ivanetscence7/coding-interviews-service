FROM node:12 as node
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app

ARG configuration=production
RUN npm run build -- --prod --configuration $configuration

FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
