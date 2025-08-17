# API design in Node.js with Express
> Andrey Golosnyak

## Local development

```
    docker-compose up --build
```


### Testing
THe other resources don't have any test, go ahead and write some!

docker-compose -f docker-compose-test.yml up

Project start
root directory
docker-compose up

backend-ts
npm run test - run tests in backend-ts. docker-compose should work with test database.
npm run docker:test run tests in docker. Separate database for tests is used.
npm run seed - seed database using default database settings from backend-ts/src/config/index.ts
npm run fresh - fresh database using with default database settings
npm run migration:run



