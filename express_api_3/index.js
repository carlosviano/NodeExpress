import express from 'express' // para que funcione debemos meter en el json el apartado de type:module. Tambien hemos metido en el json
// el nodemon con el start.
import dotenv from 'dotenv'
import logger from 'morgan'
import accountRouter from './Routes/account.js'
import authRouter from './Routes/auth.js'
import userRouter from './Routes/user.js'
import authSessionRouter from './Routes/auth_session.js'
import cookieParser from "cookie-parser"
import authTokenRouter from './Routes/auth_token.js'


dotenv.config()

const PORT = process.env.PORT;
const expressApp = express();

// middlware express
expressApp.use(express.json())
expressApp.use(express.text())
expressApp.use(logger('dev'))
expressApp.use(cookieParser());

//api middleware 
expressApp.use('/account', accountRouter)
expressApp.use('/auth', authRouter)
expressApp.use('/user', userRouter)
expressApp.use('/auth-session',authSessionRouter)
expressApp.use('/auth-token',authTokenRouter)



expressApp.listen(PORT,()=> console.log(`Server in port ${PORT}`))