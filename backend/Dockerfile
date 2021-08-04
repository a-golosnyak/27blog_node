FROM  node:12-alpine

RUN npm i -g nodemon

#USER node

#VOLUME .:/home/node/code/
#VOLUME /d/Project/NodeJs/Workspace/27blog_node_react/backend:/home/node/code
#ADD     app /nodeapp
#WORKDIR /nodeapp

#RUN mkdir /home/node/code
WORKDIR /home/node/code
#COPY --chown=node:node package-lock.json package.json ./
#COPY package-lock.json package.json ./

#COPY --chown=node:node . .
COPY . /home/node/code
#COPY . .

#RUN npm install

EXPOSE 3000

#CMD ["nodemon", "--exec", "npm", "restart"]
#CMD ["npm", "run", "dev"]
#CMD ["npm", "run", "develop"]
#CMD ["nodemon", "--exec", "/home/node/code/src/index.js"]
#CMD ["nodemon", "--exec", "npm", "run", "dev"]
#CMD ["node", "-e", "console.log(\"hi lol\")"]
#CMD ["nodemon", "--exec", "/home/node/code/bla.js"]

#ENTRYPOINT ["nodemon", "/usr/src/app/server.js"]
#ENTRYPOINT ["nodemon", "--exec", "bla.js"]
ENTRYPOINT ["npm", "run", "dev"]