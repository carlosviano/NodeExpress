import express from 'express' 
import dotenv from 'dotenv'
import logger from 'morgan'
import cookieParser from "cookie-parser"
import db from './services/mysql.js'
import userRouter from './routes/user_router.js'
import productRouter from './routes/product_router.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {fileURLToPath} from 'url' 
import { dirname } from 'path'

dotenv.config()

export function currentDir(){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return {__dirname, __filename}
}

const app = express();

// middlware express
app.use(express.json())
app.use(express.text())
app.use(logger('dev'))
app.use(cookieParser());
app.use(cors());

app.use(
    fileUpload({
        createParentPath: true,
        limits: {
            filesize: 20 * 1024 * 1024
        },
        abortOnLimit: true,
        responseOnLimit: "Imagen demasiado grande",
        uploadTimeout:0,
    })
);


app.use("/user",userRouter)
app.use("/products",productRouter)

await db.createConnection();

export default app