const { UserController } = require("../../http/controllers/admin/user/user.controller");
const { checkRole } = require("../../http/middleweares/permission.guard");
const { PERMISSION } = require("../../utils/constants");
const router = require("express").Router();

router.get("/list" ,checkRole([PERMISSION.ADMIN]), UserController.getListOfUsers);
router.get("/profile" ,checkRole([]), UserController.getUserProfile);
router.patch("/edit-profile" , UserController.editUserById);

module.exports = {
    adminUserRoutes : router
}