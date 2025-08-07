# API design in Node.js with Express
> Andrey Golosnyak

## Local development

```
    docker-compose up --build
```


### Testing
THe other resources don't have any test, go ahead and write some!

docker-compose -f docker-compose-test.yml up

Root directory
docker-compose up   - start
npm run docker:test - run tests in docker


backend-ts
npm run test - run tests in backend-ts
npm run seed - seed database using default database settings from backend-ts/src/config/index.ts
npm run fresh - fresh database using with default database settings


Project start
root directory
docker-compose up

backend-ts
npm run seed
npm run migration:run

