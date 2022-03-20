import Factory from "./index";

(async () => {
  console.log('Factory test');

  try {
    const factory = new Factory();

    factory.define('User', faker => {
      return ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email('aaa', 'bbb'),
        age: faker.datatype.number({min: 10, max: 60})
      })
    })

  } catch (e) {
    console.log(e)
  }


})().then();