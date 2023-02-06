const { addEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime, deleteFileInPublic } = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
const createHttpError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const { ObjectIdValidator } = require("../../../validators/public.validator");

class EpisodeController extends Controller{
    async addEpisode(req, res, next){
        try {
            const {title , text   , type , courseID , chapterID ,fileUploadPath , fileName} = await addEpisodeSchema.validateAsync(req.body);
            const videoAddress =  path.join(fileUploadPath , fileName).replace(/\\/g , "/");
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoURL);
            const time = getTime(seconds);
            const episode = {title , text   , type , time , videoAddress}
            const createdEpisode = await CourseModel.updateOne({_id : courseID , "chapters._id" : chapterID} , {
                $push : {
                    "chapters.$.episodes" : episode
                }
            })
            if(createdEpisode.modifiedCount == 0) throw createHttpError.InternalServerError("قسمت جدید ایجاد نشد")
            return res.status(HttpStatus.CREATED).json({
                status : HttpStatus.CREATED,
                data:{
                    message : "قسمت جدید با موفقیت ایجاد شد"
                }
            })
            
        } catch (error) {
            deleteFileInPublic(req.body.videoAddress)
            next(error)
        }
    }
    async removeEpisode(req, res, next){
        try {
            const {id : episodeID} = await ObjectIdValidator.validateAsync({id : req.params.episodeID});
            const deletedEpisode = await CourseModel.updateOne(
                {"chapters.episodes._id" : episodeID} , {
                $pull : {
                    "chapters.$.episodes" : {
                        _id : episodeID
                    }
                }
            })
            if(deletedEpisode.modifiedCount == 0) throw createHttpError.InternalServerError("قسمت موردنظر حذف نشد")
            return res.status(HttpStatus.OK).json({
                status : HttpStatus.OK,
                data:{
                    message : "قسمت موردنظر با موفقیت حذف شد"
                }
            })
            
        } catch (error) {
            deleteFileInPublic(req.body.videoAddress)
            next(error)
        }
    }

    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی وارد شده صحیح نمیباشد");
        const course = await CourseModel.findById(id)
        if(!course) throw createHttpError.NotFound("دوره یافت نشد");
        return course;
    }

    async getOneChapter(id){
        const chapter = await CourseModel.findOne({"chapters._id" : id} , {"chapters.$" : 1})
        if(!chapter) throw createHttpError.NotFound("فصل موردنظر یافت نشد");
        return chapter;
    }
}

module.exports = {
    EpisodeController : new EpisodeController()
}