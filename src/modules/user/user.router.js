import express from "express";
import { forgetPassword, passwordToReset, signIn , signUp , softDelete, updateUserByUserId, verifyUser } from './user.controller.js';
import { validation } from './../../middleware/validation.js';
import { emailSchema, passwordSchema, signinSchema , signupSchema, updateUserSchema } from './user.validation.js';
import { isAuth } from './../../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/signup',validation(signupSchema) , signUp  )
userRouter.post('/signin',validation(signinSchema) , signIn)
userRouter.get('/verify/:token' , verifyUser)
userRouter.post('/forget_password',validation(emailSchema) , forgetPassword)
userRouter.post('/passwordReset/:token', validation(passwordSchema) , passwordToReset)
userRouter.put('/update' , isAuth , validation(updateUserSchema) , updateUserByUserId)
userRouter.put('/de-activate' , isAuth , softDelete)

export default userRouter;