import express from "express"
import { dbConnection } from './databases/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';

import * as dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = 3000

app.use(express.json());



app.use('/api/users' , userRouter)

app.use(( err , req , res , next ) => {
    res.json(err)
})

dbConnection()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.send.PORT ||  port, () => console.log(`Example app listening on port ${port}!`))