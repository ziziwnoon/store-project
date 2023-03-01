const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middleweares/stringToArray");

const router = require("express").Router();

router.get("/list" , RoleController.getAllRoles)
router.post("/add" , stringToArray("permissions"), RoleController.addRole)
router.patch("/edit/:id" , stringToArray("permissions") , RoleController.updateRoleById)
router.delete("/remove/:field" , RoleController.removeRole)

module.exports = {
    adminRoleRoutes : router
}