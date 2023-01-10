import express from "express"; //para que funcione debemos meter en el json el apartado de type:module. Tambien hemos metido en el json
// el nodemon con el start.
import dotenv from "dotenv";
import logger from "morgan";
import accountRouter from "./Routes/account.js";

dotenv.config();

const PORT = process.env.PORT;
const expressApp = express();

//middlware
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(logger('dev'));
expressApp.use("/account",accountRouter)


expressApp.listen(PORT, () =>{
    console.log(`Server in port ${PORT}`);}
);

