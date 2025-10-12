FROM  node:22-slim as base
RUN npm i -g nodemon

RUN mkdir /home/backend-ts
WORKDIR /home/backend-ts

ARG DB_PORT

COPY package-lock.json package.json ./
RUN npm i
COPY . .
EXPOSE 3000


FROM base as test
CMD ["npm", "run", "test"]

FROM base as develop
CMD ["npm", "run", "dev"]

FROM base as release
CMD ["npm", "run", "start"]
