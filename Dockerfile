FROM node:latest
WORKDIR /api-gateway
COPY ./api-gateway/package*.json ./
COPY ./api-gateway/.env ./

RUN npm install
COPY ./api-gateway .

RUN npm run build
EXPOSE 9152

CMD ["node", "bin/index.js"]