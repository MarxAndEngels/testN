FROM node:18-buster-slim

ENV APP_ROOT /var/www
WORKDIR ${APP_ROOT}
ENV NODE_ENV production

ADD . ${APP_ROOT}

RUN npm run build

CMD [ "node", ".output/server/index.mjs" ]


