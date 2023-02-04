const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add-chapter" , ChapterController.addChapter);
router.get("/list/:courseID" , ChapterController.listOfChapters);
router.patch("/remove/:id" , ChapterController.removeChapterById);
router.patch("/edit/:id" , ChapterController.editChapterById);
module.exports = {
    adminChapterRoutes : router
}