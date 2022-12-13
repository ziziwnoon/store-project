const { verifyAccesstoken, checkRole } = require("../../http/middleweares/verifyAccessToken");
const { adminBlogRoutes } = require("./blog");
const { adminCategoryRoutes } = require("./category");
const { adminCourseRoutes } = require("./course");
const { adminProductRoutes } = require("./product");

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
 *  -   name: Product(AdminPanel)
 *      description: Product utils
 *  -   name: Course(AdminPanel)
 *      description: Course managment
 */
router.use("/category" , adminCategoryRoutes);
router.use("/blog"  ,adminBlogRoutes);
router.use("/product" , adminProductRoutes)
router.use("/course" , adminCourseRoutes)

module.exports = {
    AdminRoutes : router
}