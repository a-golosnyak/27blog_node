import {Post} from "../database/models/Post";
import { getMongoManager } from "typeorm"
import faker from "@faker-js/faker";

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
      const doc = await getMongoManager().findOne(Post, [req.params.id]) ;

      if (!doc) {
        return res.status(400).end()
      }

      res.status(200).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }

  }

  static async create(req, res) {
    // const createdBy = req.user._id
    try {
      const doc = await getMongoManager().create(Post, { ...req.body })
      // const doc = await getMongoManager().create(Post, {
      //   title: req.params.title ?? 'Title create ' + faker.lorem.sentence(),
      //   body: req.params.body ?? faker.lorem.paragraph(),
      //   user: req.params.user
      // })
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  static async update(req, res) {
    try {
      // const updatedDoc = await model
      //   .findOneAndUpdate(
      //     {
      //       createdBy: req.user._id,
      //       _id: req.params.id
      //     },
      //     req.body,
      //     { new: true }
      //   )
      //   .lean()
      //   .exec()

      console.log('----- Here -------------------------')
      console.log(req.params.id)

      const updatedDoc = await getMongoManager()
        .findOneAndUpdate(Post, {
            _id: req.params.id
          },
          {
            title: req.params.title ?? 'Title create ' + faker.lorem.sentence(),
            body: req.params.body ?? faker.lorem.paragraph(),
            user: req.params.user
          }
        )

      if (!updatedDoc) {
        return res.status(400).end()
      }

      res.status(200).json({ data: updatedDoc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  static async destroy(req, res) {
    res.send('destroy').status(200).end();

  }
}

export default PostsController