import { Router } from 'express'
import PostsController from "../controllers/PostsController";
const router = Router()

// /api/post
router
  .route('/')
  .get(PostsController.index)
  .post(PostsController.create)

// /api/post/:id
router
  .route('/:id')
  .get(PostsController.show)
  .put(PostsController.update)
  .delete(PostsController.destroy)

export default router;
