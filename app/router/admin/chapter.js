const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add-chapter" , ChapterController.addChapter);
router.get("/list/:id" , ChapterController.listOfChapters);
router.patch("/remove/:id" , ChapterController.removeChapterById);
module.exports = {
    adminChapterRoutes : router
}