const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = require("express").Router();

router.get("/list" , PermissionController.getListOfPermissions)
router.post("/add" , PermissionController.addPermission)
router.post("/remove/:id" , PermissionController.removePermissionById)

module.exports = {
    adminPermissionRoutes : router
}