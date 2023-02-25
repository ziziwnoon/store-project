const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");

const router = require("express").Router();

router.get("/list" , RoleController.getAllRoles)
router.post("/add" , RoleController.addRole)
router.delete("/remove/:field" , RoleController.removeRole)

module.exports = {
    adminRoleRoutes : router
}