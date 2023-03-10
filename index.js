import express from "express"
import { dbConnection } from './databases/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';
import bookRouter from "./src/modules/book/book.router.js";

import multer from "multer";

import * as dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = 3000

app.use(express.json());


const storage = multer.diskStorage({
    destination : ( req , file , cb ) => {
        cb(null , 'uploads/')
    },
    filename :( req , file , cb ) => {
        cb(null , "ahmed" + "-" + file.originalname)
    }

})

const upload = multer({ storage }) 


app.use(upload.single('path'))


app.use('/api/users' , userRouter)

app.use('/api/books' , bookRouter)



app.use(( err , req , res , next ) => {
    res.json(err)
})

dbConnection()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.send.PORT ||  port, () => console.log(`Example app listening on port ${port}!`))