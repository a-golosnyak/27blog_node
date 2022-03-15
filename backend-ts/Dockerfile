FROM  node:12-slim
RUN npm i -g nodemon

RUN mkdir /home/backend-ts
WORKDIR /home/backend-ts

ARG DB_PORT

COPY package-lock.json package.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
