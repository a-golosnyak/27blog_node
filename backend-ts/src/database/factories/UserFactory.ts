import Factory from './index'

(async () => {
  console.log('Seeder');

  try{

    const factory = new Factory();

    factory.define('User', faker => {
      return ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(this.firstName, this.lastName),
        age: faker.datatype.number({min: 10, max: 60})
      })
    })

  } catch (e) {
    console.log(e)
  }


})();

process.exit();