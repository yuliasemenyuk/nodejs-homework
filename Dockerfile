FROM node

WORKDIR /nodejs-homework

COPY package.json /nodejs-homework

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
