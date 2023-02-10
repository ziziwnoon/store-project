const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();

router.patch("/add" , uploadVideo.single("video") ,EpisodeController.addEpisode);
router.patch("/edit/:episodeID" , uploadVideo.single("video") ,EpisodeController.editEpisode);
router.delete("/remove/:episodeID" ,EpisodeController.removeEpisode);
module.exports = {
    adminEpisodeRoutes : router
}