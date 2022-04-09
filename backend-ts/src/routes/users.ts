import * as express from "express";
import PostsController from "../controllers/PostsController";
import {CreatePostRequest} from "../request/Posts/CreatePostRequest";
import {UpdatePostRequest} from "../request/Posts/UpdatePostRequest";
const router = express.Router();

router
  .route('/')
  .get(PostsController.index)
  .post(CreatePostRequest.validate, PostsController.create)

// /api/post/:id
router
  .route('/:id')
  .get(PostsController.show)
  .put(UpdatePostRequest.validate, PostsController.update)
  .delete(PostsController.destroy)

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
