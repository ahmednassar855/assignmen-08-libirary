import express from "express";
import { isAuth } from './../../middleware/auth.js';
import { validation } from "../../middleware/validation.js";
import { addBookSchema } from "./book.validation.js";
import { addBook, bookStatus, deleteBook, getBooks, reserveBook } from './book.controller.js';

const bookRouter = express.Router();


bookRouter.post('/addbook' , isAuth ,validation(addBookSchema),  addBook  )
bookRouter.delete('/:id' , isAuth ,  deleteBook  )
bookRouter.patch('/reserveBook/:id' , isAuth,  reserveBook  )


bookRouter.get('/' , isAuth ,  getBooks  )




export default bookRouter;