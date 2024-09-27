FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm ci --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
