import userQueries from "./mysql_queries/user_queries.js";

const dao = {};

//Buscar un usuario por el email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email)

//Añadir un nuevo usuario
dao.addUser = async (userData) =>  await userQueries.addUser(userData)

//Buscar usuario por Id
dao.getUserById = async (id) => await userQueries.getUserById(id)

//Eliminar user por Id
dao.deleteUser = async (id) => await userQueries.deleteUser(id)

export default dao;