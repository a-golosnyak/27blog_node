import { Router } from 'express'
import PostsController from "../controllers/PostsController";
import { CreatePostRequest } from '../request/Posts/CreatePostRequest';
import { UpdatePostRequest } from '../request/Posts/UpdatePostRequest';
import { PostsCommentsController } from '../controllers/PostsCommentsController';

const postsRouter = Router();

postsRouter.get('/',       PostsController.index);
postsRouter.get('/:id',    PostsController.show);
postsRouter.post('/',      CreatePostRequest.validate, PostsController.create);
postsRouter.put("/:id",    UpdatePostRequest.validate, PostsController.update);
postsRouter.delete('/:id', PostsController.destroy);
postsRouter.get('/:postId/comments', PostsCommentsController.getCommentsByPostId);

export default postsRouter;
