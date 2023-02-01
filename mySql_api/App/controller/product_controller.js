import { currentDir } from "../index.js";
import dao from "../services/dao.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.uploadImage = async (req, res) => {
  try {
    if (req.files === null) return;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningun archivo");
    }

    if (!req.query) {
      return res.status(400).send("No se ha indicado el id del producto");
    }

    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;
    images.forEach(async (image) => {
      let uploadPath = __dirname + "/public/images/products/" + image.name;
      let BBDDPath = "images/products/" + image.name;
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addImage({
        name: image.name,
        path: BBDDPath,
        producto: req.query.productId,
      });
    });
    return res.send("Imagen subida");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getImage = async (req, res) => {
  try {
    console.log(req.params.id);
    const image = await dao.getImageById(req.params.id);

    if (image.length <= 0) return res.status(404).send("La imagen no existe");

    return res.send({ path: image[0].path });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.addProduct = async (req, res) => {
  const { nombre, precio, referencia } = req.body;

  if (!nombre || !precio || !referencia) {
    return res.status(400).send("Error al recibir el body");
  }
  try {
    const product = await dao.getProductByRef(referencia);

    if (product.length > 0)
      return res.status(409).send("producto ya registrado");

    const addProduct = await dao.addProduct(req.body);

    if (addProduct) {
      return res.send(`Producto ${nombre} con id ${addProduct} registrado`);
    }
  } catch (e) {
    console.log(e.message);
  }
};

controller.getAllProducts = async (req, res) => {
  try {
    const products = await dao.getAllProducts();
    console.log(products);

    return res.send(products);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getProductByReferencia = async (req, res) => {
  try {
    console.log(req.params.ref);
    const product = await dao.getProductByRef(req.params.ref);
    return res.status(200).send(product);
  } catch (e) {
    console.log(e.message);
  }
};

controller.addUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Error al recibir el body");

  try {
    const user = await dao.getUserByEmail(email);

    if (user.length > 0) return res.status(409).send("usuario ya registrado");

    const addUser = await dao.addUser(req.body);
    if (addUser)
      return res.send(`Usuario ${email} con id: ${addUser} registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.addToCart = async (req, res) => {
  const { id, producto, cantidad, precio } = req.body;

  if (!id || !producto || !cantidad || !precio)
    return res.status(400).send("Error al recibir el body");

  try {
    const producto = await dao.getProductByRef(ref);
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
