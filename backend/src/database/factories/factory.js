import faker from 'faker';

export default class Factory {
  constructor(fakerInstance = null) {
    this._faker = fakerInstance || faker;
    this._factories = {};
    this._times = null;
  }

  define(name, callback) {
    this._factories[name] = callback;

    // console.log(name)
    // console.log(callback.toString())

    return this;
  }

  times(number) {
    if (number < 1) {
      throw new Error('Argument 1 must be positive');
    }

    this._times = number;

    return this;
  }

  async make(name, overrides = {}) {
    if (!this._factories.hasOwnProperty(name)) {
      throw new Error(`Model '${name}' not defined`);
    }

    let callback = this._factories[name];

    // Do we want 1 or an array of several
    // if(this._times !== null){
    //     let amount = this._times;
    //
    //     this._times = null;
    //
    //     return [...new Array(amount)].map(i => {
    //         return this._makeOnce(callback, overrides);
    //     })
    // }

    // return one instance
    const val = await this._makeOnce(callback, overrides, name);
    return val;
  }

  async _makeOnce(callback, overrides, name) {
    let obj = callback(this._faker, this);

    // console.log(obj)
    // console.log(overrides)

    // let User1 = require(`../../resources/user/${name.toLowerCase()}.model`);
    let User = require(`../../models/user.model`);
    // import {User} from "../../resources/user/user.model";
    // User.debugeee();
    // console.log(User);
    // console.log({
    //   ...obj,
    //   ...overrides
    // });

    // let instance = await User.create({
    //   ...obj,
    //   ...overrides
    // });

    return User;
  }
}
