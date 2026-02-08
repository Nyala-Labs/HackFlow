FROM node:22-alpine

WORKDIR /usr/start

RUN corepack enable pnpm

COPY pnpm-lock.yaml package.json ./

RUN chown -R node:node /usr/start
USER node
RUN pnpm install --frozen-lockfile --prefer-offline

COPY ./ ./

RUN pnpm build

EXPOSE 3000

ENTRYPOINT ["node", "build/index.js"]
