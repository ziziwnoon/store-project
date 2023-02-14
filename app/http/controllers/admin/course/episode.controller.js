const { addEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const {
  getTime,
  deleteFileInPublic,
  deleteInvalidPropertiesInObject,
  copyObject,
} = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const { ObjectIdValidator } = require("../../../validators/public.validator");

class EpisodeController extends Controller {
  async addEpisode(req, res, next) {
    try {
      const {
        title,
        text,
        type,
        courseID,
        chapterID,
        fileUploadPath,
        fileName,
      } = await addEpisodeSchema.validateAsync(req.body);
      req.body.videoAddress = path
        .join(fileUploadPath, fileName)
        .replace(/\\/g, "/");
      const videoAddress = req.body.videoAddress;
      const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
      const seconds = await getVideoDurationInSeconds(videoURL);
      const time = getTime(seconds);
      const episode = { title, text, type, time, videoAddress };
      const createdEpisode = await CourseModel.updateOne(
        { _id: courseID, "chapters._id": chapterID },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (!createdEpisode.modifiedCount)
        throw createHttpError.InternalServerError("قسمت جدید ایجاد نشد");
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        data: {
          message: "قسمت جدید با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.videoAddress);
      next(error);
    }
  }

  async editEpisode(req, res, next) {
    try {
      const { episodeID } = req.params;
      const episode = await this.getOneEpisode(episodeID);
      console.log(episode);
      const { fileUploadPath, fileName } = req.body;
      let blackListFields = ["_id"];
      if (fileUploadPath && fileName) {
        const fileAddress = path.join(fileUploadPath, fileName);
        req.body.videoAddress = fileAddress.replace(/\\/g, "/");
        const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
        const seconds = await getVideoDurationInSeconds(videoURL);
        req.body.time = getTime(seconds);
        blackListFields.push("fileUploadPath");
        blackListFields.push("fileName");
      } else {
        blackListFields.push("time");
        blackListFields.push("videoAddress");
      }
      const data = req.body;
      await deleteInvalidPropertiesInObject(data, blackListFields);
      const newEpisode = { ...episode, ...data }; //برای اینکه کل اپیزود تغییر نکنه و فقط تغییرات اعمال بشه
      const updatedEpisode = await CourseModel.updateOne(
        { "chapters.episodes._id": episodeID },
        {
          $set: {
            "chapters.$.episodes": newEpisode,
          },
        }
      );
      if (!updatedEpisode.modifiedCount)
        throw createHttpError.InternalServerError("قسمت موردنظر ویرایش نشد");
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        data: {
          message: "قسمت موردنظر با موفقیت ویرایش شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.videoAddress);
      next(error);
    }
  }

  async removeEpisode(req, res, next) {
    try {
      const { id: episodeID } = await ObjectIdValidator.validateAsync({
        id: req.params.episodeID,
      });
      const deletedEpisode = await CourseModel.updateOne(
        { "chapters.episodes._id": episodeID },
        {
          $pull: {
            "chapters.$.episodes": {
              _id: episodeID,
            },
          },
        }
      );
      if (deletedEpisode.modifiedCount == 0)
        throw createHttpError.InternalServerError("قسمت موردنظر حذف نشد");
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          message: "قسمت موردنظر با موفقیت حذف شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.videoAddress);
      next(error);
    }
  }

  async getOneEpisode(episodeID) {
    const course = await CourseModel.findOne(
      { "chapters.episodes._id": episodeID },
      { "chapters.episodes.$": 1 }
    );
    if (!course) throw createHttpError.NotFound("دوره موردنظر یافت نشد");
    const episode = await course?.chapters?.[0]?.episodes?.[0];
    if (!episode) throw createHttpError.NotFound("قسمت موردنظر یافت نشد");
    return copyObject(episode);
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
