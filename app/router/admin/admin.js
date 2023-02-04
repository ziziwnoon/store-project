const { verifyAccesstoken, checkRole } = require("../../http/middleweares/verifyAccessToken");
const { adminBlogRoutes } = require("./blog");
const { adminCategoryRoutes } = require("./category");
const { adminChapterRoutes } = require("./chapter");
const { adminCourseRoutes } = require("./course");
const { adminEpisodeRoutes } = require("./episode");
const { adminProductRoutes } = require("./product");

const router = require("express").Router();


router.use("/category" , adminCategoryRoutes);
router.use("/blog"  ,adminBlogRoutes);
router.use("/product" , adminProductRoutes)
router.use("/course" , adminCourseRoutes)
router.use("/chapter" , adminChapterRoutes)
router.use("/episode" , adminEpisodeRoutes)

module.exports = {
    AdminRoutes : router
}