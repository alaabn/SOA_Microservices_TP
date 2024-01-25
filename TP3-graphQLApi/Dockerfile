FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=builder /app/build ./

EXPOSE 4000

CMD ["npm", "start"]