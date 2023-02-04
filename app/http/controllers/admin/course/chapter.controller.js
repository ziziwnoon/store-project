const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const {CourseController} = require("../course/course.controller")
const Controller = require("../../controller");
const { copyObject, deleteInvalidPropertiesInObject } = require("../../../../utils/functions");

class ChapterController extends Controller{
    async addChapter(req, res, next){
        try {
            const {id , title , text} = req.body;
            await CourseController.findCourseById(id);
            const addChapterResult = await CourseModel.updateOne({_id : id} , {$push : {
                chapters : {title , text , episodes : []}
            }})
            if (addChapterResult.modifiedCount == 0) throw createHttpError.BadRequest("فصل جدید اضافه نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED ,
                data : {
                    message : "فصل جدید با موفقیت اضافه شد" 
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async listOfChapters(req, res, next){
        try {
            const {courseID} = req.params;
            const course = await this.getChapterOfCourse(courseID);
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeChapterById(req,res,next){
        try {
            const {id} = req.params;
            await this.getOneChapter(id);
            const removeChapterResult = await CourseModel.updateOne({"chapters._id" : id} , {
                $pull : {
                    chapters : {
                        _id : id
                    }
                }
            })
            if(removeChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("حذف فصل انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "فصل با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async editChapterById(req, res, next){
        try {
            const {id} = req.params;
            await this.getOneChapter(id);
            const data = copyObject(req.body);
            deleteInvalidPropertiesInObject(data , ["_id"]);
            const updateChapterResult = await CourseModel.updateOne({"chapters._id" : id} , {
                $set : {
                    "chapters.$" : data
                }
            })
            if(updateChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("ویرایش فصل انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK , 
                data : {
                    message : "فصل با موفقیت ویرایش شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getChapterOfCourse(id){
        const chapters = await CourseModel.findOne({_id : id} , {chapters : 1})
        if(!chapters) throw createHttpError.NotFound("سرفصلی یافت نشد");
        return chapters;
    }

    async getOneChapter(id){
        const chapter = await CourseModel.findOne({"chapters._id" : id} , {"chapters.$" : 1})
        if(!chapter) throw createHttpError.NotFound("فصل موردنظر یافت نشد");
        return chapter;
    }

    

}

module.exports = {
    ChapterController : new ChapterController()
}