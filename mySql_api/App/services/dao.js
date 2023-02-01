import userQueries from "./mysql_queries/user_queries.js";
import productQueries from "./mysql_queries/product_queries.js";

const dao = {};

//Buscar un usuario por el email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);

//Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData);

//Buscar usuario por Id
dao.getUserById = async (id) => await userQueries.getUserById(id);

//Eliminar user por Id
dao.deleteUser = async (id) => await userQueries.deleteUser(id);

//Actualizar user por Id
dao.updateUser = async (id, userData) =>
  await userQueries.updateUser(id, userData);

//Añadir imagen a la bbdd
dao.addImage = async (image) => await productQueries.addImage(image);

//Obtener imagen por id
dao.getImageById = async (id) => await productQueries.getImageById(id);

//Obtener producto por referencia
dao.getProductByRef = async (referencia) =>
  await productQueries.getProductByRef(referencia);

//Añadir un producto a bbdd
dao.addProduct = async (productData) =>
  await productQueries.addProduct(productData);

//Traer todos los productos de la bbdd
dao.getAllProducts = async (nulo) => await productQueries.getAllProducts(nulo);

export default dao;
