const { UserController } = require("../../http/controllers/admin/user/user.controller");
const router = require("express").Router();

router.get("/list" , UserController.getListOfUsers);

module.exports = {
    adminUserRoutes : router
}