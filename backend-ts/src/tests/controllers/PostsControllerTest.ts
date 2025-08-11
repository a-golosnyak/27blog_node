import request from "supertest";
import assert from "assert";
import userFactory from "../../database/factories/UserFactory";
import { AuthService } from "../../services/AuthService";
import PostFactory from "../../database/factories/PostFactory";
import { Post } from "../../database/models/Post";
import { AppDataSource } from "../../AppDataSource";
import app from "../../app";
import { ObjectId } from "mongodb";
import { setupTestUser } from "../utils/setupTestUser";
import { User } from "database/models/User";

describe('Posts', () => {
  let createdPost: Post;
  let testUser: User;
  let testToken: string;

  beforeAll(async() => {
    await AppDataSource.initialize();

    const { user, token } = await setupTestUser();
    testUser = user;
    testToken = token;
  })

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it('should return -1 when the value is not present', function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });

  it('GET /api/posts - should return all posts', async () => {

    await PostFactory.create({ title: "Test Post", body: "Test Body" }, 2);

    const res = await request(app).get("/api/posts")
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data).toHaveLength(2);
  });

  it("POST /api/posts - should create a post", async () => {
    const postData = { title: "New Post", body: "New Body", userId: new ObjectId() };
    const res = await request(app)
      .post("/api/posts")
      .set('Authorization', `Bearer ${testToken}`).send(postData);

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    createdPost = await Post.findOne({ where: { _id: ObjectId.createFromHexString(res.body.data.id) } });
    expect(createdPost).not.toBeNull();
    expect(createdPost.title).toBe(postData.title);
  });

  it("GET /api/posts/:id - should return a single post", async () => {
    const res = await request(app).get(`/api/posts/${createdPost._id}`)
      .set('Authorization', `Bearer ${testToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("_id", createdPost._id.toString());
  });

  it("PUT /api/posts/:id - should update a post", async () => {
    const updateData = { title: "Updated Title" };
    const res = await request(app).put(`/api/posts/${createdPost._id}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe(updateData.title);
  });

  it("DELETE /api/posts/:id - should soft delete a post", async () => {
    const res = await request(app)
      .delete(`/api/posts/${createdPost._id}`)
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("_id", createdPost._id.toString());
  });

  it.skip('should return all posts', async () => {

    const user = await userFactory.create({
      // email: req.body.email,
      // password: req.body.password,
      role: 'user'
    }, 1);

    const token = AuthService.newToken(user[0]);

    const post: Post | any = await PostFactory.create({
      userId: user[0]._id
      // user: 'bbb@gmail.com'
    }, 1);

    console.log('--- Here user -----');
    console.log(process.env.NODE_ENV);
    console.log(user[0]);

    // await chai.request(SERVER_URL)
    //   .get('/api/post')
    //   .set({'Authorization': `Bearer ${token}`})
    //   .then(res => {
    //     res.body.data.should.be.a("array");
    //     // res.body.data.should.have.property('role');
    //     // res.should.have.status(200);
    //     console.log('--- Here response -----');
    //     console.log(res.text);
    //
    //     res.status.should.equal(200);
    //   })
    //     .catch(err => {
    //       console.log('--- Here error -----');
    //       console.log(err)
    //     })
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
    console.log(ObjectId.createFromHexString(post.id))
    // console.log(removed)
  })
})
