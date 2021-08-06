FROM  node:12-slim
RUN npm i -g nodemon
#USER node
#VOLUME .:/home/node/code/
RUN mkdir /home/backend
WORKDIR /home/backend
#COPY --chown=node:node package-lock.json package.json ./
#COPY --chown=node:node . .

ARG DB_PORT

COPY package-lock.json package.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["nodemon", "--legacy-watch", "--exec", "npm", "restart"]
