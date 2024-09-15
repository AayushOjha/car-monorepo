import { Router } from 'express';
import { validate } from '../middlewares/validations/validationMiddleware';
import {
  createUserSchema,
  bookServiceSchema
} from '../middlewares/validations/validationSchemas';
import {
  listUser,
  bookService,
  createUser,
  getUserSubscriptions,
  cancelSubscription
} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', listUser);
userRouter.post('/', validate(createUserSchema), createUser);

userRouter.post('/:userId/book', validate(bookServiceSchema), bookService);

userRouter.get('/:userId/subscriptions', getUserSubscriptions);

userRouter.post('/:userId/cancel-subscriptions', cancelSubscription);

export { userRouter };
