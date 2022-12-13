const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middleweares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

 router.post("/add" , uploadFile.array("images" , 10) , stringToArray("tags" , "colors"), ProductController.addProduct);
 router.patch("/edit/:id" , uploadFile.array("images" , 10) , stringToArray("tags" , "colors"), ProductController.editProduct);
 router.get("/list-of-all" , ProductController.getAllProducts);
 router.get("/:id" , ProductController.getProductById);
 router.delete("/delete/:id" , ProductController.removeProduct);

module.exports = {
    adminProductRoutes : router
}