import {Post} from "../database/models/Post";
import {getMongoManager} from "typeorm"
import faker from "@faker-js/faker";
import * as mongodb from "mongodb";
import { ObjectId } from "mongodb";
import {NextFunction, Request, Response} from "express";

class PostsController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const docs = await Post.find();
      console.log('--- Here PostsController.index -----');

      res.status(200).send({data: docs});
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e });
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

      if (!doc) {
        res.status(400).json({ error: 'Doesn\'t find'});
      }

      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e });
    }
  }

  static async create(req: Request, res: Response) {
    // const createdBy = req.user._id
    console.log('----- PostsController.create -------------------');
    console.log('req', req.body);

    try {
      // const doc = await getMongoManager().create(Post, { ...req.body })
      // const doc = await getMongoManager().create(Post, {
      //   title: req.params.title ?? 'Title 1 ' + faker.lorem.sentence(),
      //   body: req.params.body ?? faker.lorem.paragraph(),
      //   user: req.params.user ?? 'zzz@mail.ru'
      // }).save()
      // res.status(201).json({ data: doc })

      const post: Post = Post.create({
        title: req.body.title,
        body: req.body.body,
        user: req.body.user ?? '111'
      });

      let result = await post.save();

      console.log('post', post);
      console.log('result', result);

      res.status(201).json({ data: { id: post._id }});
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
