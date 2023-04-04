import chai from "chai";
import chaiHttp from "chai-http";
import assert from "assert";
import config from "../../config";
import userFactory from "../../database/factories/UserFactory";
import {createConnection, getConnectionOptions, getMongoManager} from "typeorm";
import {AuthService} from "../../services/AuthService";
import PostFactory from "../../database/factories/PostFactory";
import {Post} from "../../database/models/Post";
import * as mongodb from "mongodb";

let should = chai.should();

chai.use(chaiHttp)

const SERVER_URL =`${config.APP_URL}:${config.APP_PORT}`;


describe('Posts', () => {
  beforeAll(async() => {
    let connectionOptions = await getConnectionOptions();
    await createConnection(
      Object.assign(connectionOptions, {
        url: process.env.MONGO_CONNECTION_STRING
      })
    );
  })
  it('should return -1 when the value is not present', function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });

  it('should return test page', () => {
    chai.request(SERVER_URL)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.message.should.equal('Welcome to the contacts API!');
        // console.log(res.body);
      })
  });

  it('should return all posts', async () => {

    const user = await userFactory.create({
      // email: req.body.email,
      // password: req.body.password,
      role: 'user'
    }, 1);

    const token = AuthService.newToken(user[0]);

    const post: Post | any = await PostFactory.create({
      user: user[0].email
      // user: 'bbb@gmail.com'
    }, 1);

    console.log('--- Here user -----');
    console.log(process.env.NODE_ENV);
    console.log(user[0]);

    await chai.request(SERVER_URL)
      .get('/api/post')
      .set({'Authorization': `Bearer ${token}`})
      .then(res => {
        res.body.data.should.be.a("array");
        // res.body.data.should.have.property('role');
        // res.should.have.status(200);
        console.log('--- Here response -----');
        console.log(res.text);

        res.status.should.equal(200);
      })
        .catch(err => {
          console.log('--- Here error -----');
          console.log(err)
        })
      // .end((err, res) => {
      //   res.should.have.status(200);
      //   res.body.should.have.property('message');
      //   res.body.message.should.equal('Welcome to the contacts API!');
      //   // console.log(res.body);
      // })
    // const removed = await getMongoManager().findOneAndDelete(Post, {
    //   _id: new mongodb.ObjectId(post.id)
    // })

    console.log('--- Here error -----');
    console.log(post);
    console.log(JSON.stringify(post.id));
    console.log(new mongodb.ObjectId(post.id))
    // console.log(removed)
  })
})