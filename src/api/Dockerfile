FROM node:14

WORKDIR /app 

COPY package.json . 
COPY package-lock.json .
RUN npm ci 
COPY . .

CMD npm run start:dev
