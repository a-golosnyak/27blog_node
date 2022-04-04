import { Router } from 'express'
import PostsController from "../controllers/PostsController";
import {CreatePostRequest} from "../Request/Posts/CreatePostRequest";
const router = Router()

// /api/post
router
  .route('/')
  .get(PostsController.index)
  .post(CreatePostRequest.validate, PostsController.create)
  // .post((req, res, next) => {
  //   console.log('----- Middleware here ------------------');
  //   next()
  // }, PostsController.create)

// /api/post/:id
router
  .route('/:id')
  .get((req, res, next) => {
    console.log('----- Middleware show here ------------------');
    // next()
  }, PostsController.show)
  .put(PostsController.update)
  .delete(PostsController.destroy)

export default router;
