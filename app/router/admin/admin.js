const { CategoryRoutes } = require("./catrgory");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  -   name: AdminPanel
 *      description : Admin utils
 *  -   name: Category(AdminPanel)
 *      description: Category utils
 */
router.use("/category" , CategoryRoutes);

module.exports = {
    AdminRoutes : router
}