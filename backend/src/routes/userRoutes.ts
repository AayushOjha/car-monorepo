import { Router } from 'express';
import { validate } from '../middlewares/validations/validationMiddleware';
import {
  createUserSchema,
  bookServiceSchema
} from '../middlewares/validations/validationSchemas';
import {
  bookService,
  createUser,
  getUserSubscriptions
} from '../controllers/userController';

const userRouter = Router();

userRouter.post('/', validate(createUserSchema), createUser);

userRouter.post('/:userId/book', validate(bookServiceSchema), bookService);

userRouter.get('/:userId/subscriptions', getUserSubscriptions);

userRouter.post('/:userId/cancel-subscriptions', getUserSubscriptions);

export { userRouter };
