const { CategoryController } = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

router.post("/add" , CategoryController.addCategory);
router.get("/parents" , CategoryController.getAllParents);
router.get("/children/:parent" , CategoryController.getChildrenOfParent);
router.get("/all" , CategoryController.getAllCategories);
router.delete("/delete/:id" , CategoryController.removeCategory);
router.get("/list-of-all" , CategoryController.getAllCategoriesWithoutPopulate);
router.get("/:id" , CategoryController.getCategoryById);
router.patch("/update/:id" , CategoryController.updateCategoryTitle);

module.exports = {
    adminCategoryRoutes : router
}