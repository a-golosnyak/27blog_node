import {Post} from "../database/models/Post";
import {getMongoManager, ObjectID} from "typeorm"
import faker from "@faker-js/faker";
import * as mongodb from "mongodb";

class PostsController {
  static async index(req, res) {
    try {
      const docs = await Post.find();
      res.status(200).json({data: docs})
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  static async show(req, res) {
    try {
      const doc = await getMongoManager().findOne(Post, req.params.id);

      if (!doc) {
        res.status(400).json({ error: 'Doesn\'t find'});
      }

      res.status(200).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e });
    }
  }

  static async create(req, res) {
    // const createdBy = req.user._id
    try {
      // const doc = await getMongoManager().create(Post, { ...req.body })
      const doc = await getMongoManager().create(Post, {
        title: req.params.title ?? 'Title 1 ' + faker.lorem.sentence(),
        body: req.params.body ?? faker.lorem.paragraph(),
        user: req.params.user ?? 'zzz@mail.ru'
      }).save()
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  static async update(req, res) {
    try {
      const updatedDoc = await getMongoManager()
        .findOneAndUpdate(Post, {
            _id: new mongodb.ObjectId(req.params.id)
          },
          {
            $set: {
              title: req.params.title ?? 'Title 6 ' + faker.lorem.sentence(),
              body: req.params.body ?? faker.lorem.paragraph(),
              // user: req.params.user
            }
          },
          { upsert: true }
        )


      if (!updatedDoc) {
        res.status(400).json({ error: 'Not find' })
      }

      res.status(200).json({ data: updatedDoc.value })
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e})

    }
  }

  static async destroy(req, res) {
    try {
      const removed = await getMongoManager().findOneAndDelete(Post, {
        _id: new mongodb.ObjectId(req.params.id)
      })
      if (!removed) {
        res.status(400).json({ error: 'Not find' })
      }
      return res.status(200).json({ data: removed })
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e})

    }
  }
}

export default PostsController