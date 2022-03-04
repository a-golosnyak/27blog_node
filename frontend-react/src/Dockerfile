FROM node:12-slim

#RUN apk update && apk upgrade && \
#    apk add --no-cache bash git openssh

RUN mkdir /home/frontend
WORKDIR /home/frontend

COPY ../frontend-react/package-lock.json package.json ./
RUN npm install

COPY ../frontend-react .

EXPOSE 4000

#ARG REACT_APP_WEATHER_API_KEY
#CMD npm start

CMD ["ls"]
CMD ["node", "-e", "console.log(\"============= Hi from react container lol ========================================\")"]
CMD ["npm", "start"]