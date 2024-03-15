ARG NODE_VERSION=20.11.1-alpine

################################################################################
# BUILD FOR LOCAL DEVELOPMENT
################################################################################

FROM node:${NODE_VERSION} AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

RUN npm run prisma:generate

USER node

################################################################################
# BUILD FOR PRODUCTION
################################################################################

FROM node:${NODE_VERSION} AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci && npm cache clean --force

USER node

################################################################################
# PRODUCTION
################################################################################

FROM node:${NODE_VERSION} AS production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

ARG PORT=4000
ENV PORT=$PORT
EXPOSE $PORT

CMD ["node", "dist/main.js"]
