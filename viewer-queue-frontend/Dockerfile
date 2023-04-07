FROM node:18-alpine AS builder

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=builder /dist/ /usr/src/app/dist/
COPY --from=builder /expressDist/ /usr/src/app/expressDist/
COPY --from=builder package.json.dist /usr/src/app/package.json

RUN npm install

EXPOSE 4000
CMD ["npm", "start"]
