import express from 'express' 
import dotenv from 'dotenv'
import logger from 'morgan'
import cookieParser from "cookie-parser"


dotenv.config()

const app = express();

// middlware express
app.use(express.json())
app.use(express.text())
app.use(logger('dev'))
app.use(cookieParser());

export default app