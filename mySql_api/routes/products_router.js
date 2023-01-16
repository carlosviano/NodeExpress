import express  from "express";
import productController from '../controller/products_controller.js'

const productRouter = express.Router();

productRouter.post("/upload",productController.uploadImage);

export default productRouter;