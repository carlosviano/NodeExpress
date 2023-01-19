import express  from "express";
import productController from '../controller/product_controller.js'

const productRouter = express.Router();

productRouter.post("/upload",productController.uploadImage);

productRouter.get("/image/:id", productController.getImage);

productRouter.post("/add_product", productController.addProduct)

export default productRouter;