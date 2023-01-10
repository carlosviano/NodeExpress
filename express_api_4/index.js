import express from 'express' // para que funcione debemos meter en el json el apartado de type:module. Tambien hemos metido en el json
// el nodemon con el start.
import dotenv from 'dotenv'
import logger from 'morgan'
import cookieParser from "cookie-parser"
import apiRouter from './Routes/api.js'



dotenv.config()

const PORT = process.env.PORT;
const expressApp = express();

// middlware express
expressApp.use(express.json())
expressApp.use(express.text())
expressApp.use(logger('dev'))
expressApp.use(cookieParser());

//api middleware 
expressApp.use('/api', apiRouter)


expressApp.listen(PORT,()=> console.log(`Server in port ${PORT}`))