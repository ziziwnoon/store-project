const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");
const createError = require("http-errors");

module.exports = new class HomeController extends Controller{
    async indexPage(req,res,next){
        try {
            return res.status(statusCode.OK).send("index Page")
        } catch (error) {
            next(error)
        }
       
    }
}