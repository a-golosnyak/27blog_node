import { Router } from 'express';
import CommentsController from '../controllers/CommentsController';
import { CreateCommentRequest } from '../request/Comments/CreateCommentRequest';
import { UpdateCommentRequest } from '../request/Comments/UpdateCommentRequest';

const commentsRouter = Router();

commentsRouter.get('/',       CommentsController.getAll);
commentsRouter.get('/:id',    CommentsController.getById);
commentsRouter.post('/',      CreateCommentRequest.validate, CommentsController.create);
commentsRouter.put('/:id',    UpdateCommentRequest.validate, CommentsController.update);
commentsRouter.delete('/:id', CommentsController.delete);

export default commentsRouter;
