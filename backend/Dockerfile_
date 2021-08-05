FROM  node:12-slim

RUN npm i -g nodemon

USER node

#VOLUME .:/home/node/code/

RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --chown=node:node package-lock.json package.json ./

COPY --chown=node:node . .
#COPY . /home/node/code
#COPY . .

RUN npm i

EXPOSE 3000

#CMD ["nodemon", "server.js"]
CMD ["nodemon", "--legacy-watch", "--exec", "npm", "restart"]

#CMD ["npm", "run", "develop"]
#CMD ["nodemon", "--exec", "npm", "run", "dev"]
#CMD ["node", "-e", "console.log(\"hi lol\")"]
#CMD ["nodemon", "--exec", "/home/node/code/bla.js"]
#ENTRYPOINT ["nodemon", "/usr/src/app/server.js"]
#ENTRYPOINT ["nodemon", "--exec", "bla.js"]

#ENTRYPOINT ["npm", "run", "dev"]