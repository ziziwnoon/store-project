const { UserAuthController } = require("../../http/controllers/user/authentication/auth.controller");
const router = require("express").Router();

router.post("/get-otp" , UserAuthController.getOtp);
router.post("/check-otp" , UserAuthController.checkOtp);
router.post("/refresh-token" , UserAuthController.signRefreshToken);

module.exports = {
    UserAuthRoutes : router
}