import userQueries from "./mysql_queries/user_queries.js";

const dao = {};

//Buscar un usuario por el email
dao.getUser = async (email) => await userQueries.getUser(email)

//Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData)

export default dao;