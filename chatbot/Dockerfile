FROM node:14
WORKDIR /usr/src/leeachaanbot/chatbot
COPY package*.json ./
RUN npm i
COPY . .
CMD ["node", "src/index.js"]