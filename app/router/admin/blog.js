const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middleweares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

 router.post("/add" , uploadFile.single("image"),stringToArray("tags"),AdminBlogController.createBlog);
 router.patch("/update/:id" , uploadFile.single("image"),stringToArray("tags"),AdminBlogController.updateBlogById)
 router.get("/list" , AdminBlogController.getListOfBlogs);
 router.delete("/delete/:id" , AdminBlogController.deleteBlogById);
 router.get("/:id" , AdminBlogController.getBlogById);
 
module.exports = {
    adminBlogRoutes : router 
}