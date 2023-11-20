FROM node:18-slim

RUN apt-get update -y && apt-get install -y openssl

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false

WORKDIR /app

COPY package*.json ./

COPY build ./build/

COPY prisma ./build/prisma/

RUN npm i

RUN npm i -g prisma

RUN npx prisma generate --schema ./build/prisma/schema.prisma

ENV ORIGIN=http://localhost:80
ENV PORT=80

EXPOSE 80

CMD ["node", "build"]
