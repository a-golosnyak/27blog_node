FROM  node:12-stretch

RUN npm i -g nodemon

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

#CMD ["nodemon", "--exec", "npm restart"]
CMD ["npm", "run", "dev"]