const { UserController } = require("../../http/controllers/admin/user/user.controller");
const router = require("express").Router();

router.get("/list" , UserController.getListOfUsers);
router.patch("/edit-profile" , UserController.editUserById);

module.exports = {
    adminUserRoutes : router
}