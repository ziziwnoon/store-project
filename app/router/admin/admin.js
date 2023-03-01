const { checkRole } = require("../../http/middleweares/permission.guard");
const { verifyAccesstoken } = require("../../http/middleweares/verifyAccessToken");
const { PERMISSION } = require("../../utils/constants");
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

//اینجا از متغیر های فایل constants استفاده میکنیم که بگوییم کدام کاربران به کدام بخش ها دسترسی دارند
//به چک رول کاربر با حداقل دسترسی را پاس میدهیم که در اینصورت کاربر با دسترسی بالاتر هم بدون مشکل میتواند محتوا را مشاهده کند


router.use("/category" , checkRole([PERMISSION.CONTENT_MANAGER]),adminCategoryRoutes);
router.use("/blog"  , checkRole([PERMISSION.TEACHER]), adminBlogRoutes);
router.use("/product" , checkRole([PERMISSION.SUPPLIER]), adminProductRoutes)
router.use("/course" , checkRole([PERMISSION.TEACHER]), adminCourseRoutes)
router.use("/chapter" , checkRole([PERMISSION.TEACHER]),  adminChapterRoutes)
router.use("/episode" , checkRole([PERMISSION.TEACHER]), adminEpisodeRoutes)
router.use("/user" , adminUserRoutes)
router.use("/role" , checkRole([PERMISSION.ADMIN]), adminRoleRoutes)
router.use("/permission" , adminPermissionRoutes)

module.exports = {
    AdminRoutes : router
}