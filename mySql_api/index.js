import express from 'express' 
import dotenv from 'dotenv'
import logger from 'morgan'
import cookieParser from "cookie-parser"
import db from './services/mysql.js'
import userRouter from './routes/user_router.js'

dotenv.config()

const app = express();

// middlware express
app.use(express.json())
app.use(express.text())
app.use(logger('dev'))
app.use(cookieParser());
app.use("/user",userRouter)

await db.createConnection();

export default app