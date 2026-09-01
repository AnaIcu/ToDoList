FROM node:20-alpine

WORKDIR /app

# Copiamos primero los manifiestos para aprovechar la cache de capas de Docker
COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY server.js ./

EXPOSE 3000

CMD ["npm", "start"]
