const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { UserModel } = require("../../../../models/users");
const {
  copyObject,
  deleteInvalidPropertiesInObject,
} = require("../../../../utils/functions");
const Controller = require("../../controller");

class UserController extends Controller {
  async getListOfUsers(req, res, next) {
    try {
      const { search } = req.query;
      const DBQuery = {};
      if (search) DBQuery["$text"] = { $search: search };
      const users = await UserModel.find(DBQuery);
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editUserById(req, res, next) {
    try {
      const userID = req.user._id;
      const data = copyObject(req.body);
      const blackListFields = [
        "mobile",
        "role",
        "courses",
        "bills",
        "discount",
        "otp",
      ];
      deleteInvalidPropertiesInObject(data, blackListFields);
      const updatedResult = await UserModel.updateOne(
        { _id: userID },
        { $set: data }
      );
      
      if (!updatedResult)
        throw new createHttpError.InternalServerError("ویرایش کاربر انجام نشد");
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "ویرایش کاربر موفقیت آمیز بود",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
