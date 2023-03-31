FROM node:19.7-alpine as builder

RUN npm install -g pnpm
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm i
COPY . .
RUN pnpm build

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY ssl/ /etc/nginx/ssl
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]