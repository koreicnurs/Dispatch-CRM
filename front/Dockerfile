FROM node:16.15.0-alpine as builder

ARG api_url
ENV REACT_APP_API_URL=${api_url}
RUN npm i -g npm
RUN mkdir -p /src/app/
COPY ./package.json ./package-lock.json  /src/app/
WORKDIR /src/app/
RUN npm i
COPY ./ /src/app/
RUN npm run build

FROM umputun/nginx-le:latest

COPY --from=builder /src/app/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf