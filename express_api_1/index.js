import express from "express"; //para que funcione debemos meter en el json el apartado de type:module. Tambien hemos metido en el json
// el nodemon con el start.
import dotenv from "dotenv";
import logger from "morgan";
import { USERS_BBDD } from "./bbdd.js"



dotenv.config();

const PORT = process.env.PORT;
const expressApp = express();

//middlware
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(logger('dev'));

//Obtener los detalles de una cuenta a partir del guid
expressApp.get('/account/:guid', (req,res)=> {
    const {guid} = req.params
    const user = USERS_BBDD.find(user => user.guid === guid);

    if(!user){
        return res.status(404).send
    };

    res.send(user)

});

//Crear una cuenta nueva a partir del guid y de name
expressApp.post('/account', (req,res)=> {
    //Extraemos el guid y nombre del body. Obligamos que esten los dos campos para crear un usuario.
    const {guid,name} = req.body;
    //Si no existe guid o name recibidos por el body devolvemos un 400(bad request)
    if(!guid || !name) return res.status(400).send();

    const user = USERS_BBDD.find(user => user.guid === guid);

    if(user) return res.status(409).send();
    //Creamos un objeto nuevo con los datos recibidos con el metodo push
    USERS_BBDD.push({guid,name})

    res.send();
    //Enviamos una respuesta
});

//Actualizar el nombre de una cuenta
expressApp.patch('/account/:guid', (req,res)=> {
    const {guid} = req.params;
    const {name} = req.body;

    if(!name) return res.status(400)

    const user = USERS_BBDD.find(user => user.guid === guid);

    if(!user) return res.status(404).send();

    user.name = name;
    res.send(user)
});
//Eliminar una cuenta
expressApp.delete('/account/:guid', (req,res)=> {
    const {guid} = req.params
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);

    if(userIndex === -1) return res.status(404).send();

    USERS_BBDD.splice(userIndex,1)

    res.send('Usuario eliminado')
});




expressApp.listen(PORT, () =>{
    console.log(`Server in port ${PORT}`);}
);

