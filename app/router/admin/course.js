const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middleweares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.get("/list-of-all" , CourseController.getAllCourses);
router.get("/:id" , CourseController.getCourseById);
router.post("/add-course" ,  uploadFile.single("image") , stringToArray("tags") , CourseController.addCourse);

// router.put();
// router.patch();
// router.delete();

module.exports = {
    adminCourseRoutes : router
}