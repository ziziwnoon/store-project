const { verifyAccesstoken, checkRole } = require("../../http/middleweares/verifyAccessToken");
const { adminBlogRoutes } = require("./blog");
const { adminCategoryRoutes } = require("./category");
const { adminChapterRoutes } = require("./chapter");
const { adminCourseRoutes } = require("./course");
const { adminEpisodeRoutes } = require("./episode");
const { adminPermissionRoutes } = require("./permission");
const { adminProductRoutes } = require("./product");
const { adminRoleRoutes } = require("./role");
const { adminUserRoutes } = require("./user");

const router = require("express").Router();


router.use("/category" , adminCategoryRoutes);
router.use("/blog"  ,adminBlogRoutes);
router.use("/product" , adminProductRoutes)
router.use("/course" , adminCourseRoutes)
router.use("/chapter" , adminChapterRoutes)
router.use("/episode" , adminEpisodeRoutes)
router.use("/user" , adminUserRoutes)
router.use("/role" , adminRoleRoutes)
router.use("/permission" , adminPermissionRoutes)

module.exports = {
    AdminRoutes : router
}