import { Router } from 'express'
import PostsController from "../controllers/PostsController";
import { CreatePostRequest } from '../request/Posts/CreatePostRequest';
import { UpdatePostRequest } from '../request/Posts/UpdatePostRequest';
const router = Router();

router.get('/',       PostsController.index);
router.get('/:id',    PostsController.show);
router.post('/',      CreatePostRequest.validate, PostsController.create);
router.put("/:id", UpdatePostRequest.validate, PostsController.update);
router.delete('/:id', PostsController.destroy);

export default router;
