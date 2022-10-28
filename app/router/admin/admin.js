const { verifyAccesstoken, checkRole } = require("../../http/middleweares/verifyAccessToken");
const { adminBlogRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  -   name: AdminPanel
 *      description : Admin utils
 *  -   name: Category(AdminPanel)
 *      description: Category utils
 *  -   name: Blog(AdminPanel)
 *      description: Blog utils
 */
router.use("/category" , CategoryRoutes);
router.use("/blog" , verifyAccesstoken ,adminBlogRoutes)

module.exports = {
    AdminRoutes : router
}