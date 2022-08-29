const { UserAuthController } = require("../../http/controllers/user/authentication/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description : Login Page with one time password
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          summary: get one time password
 *          tags: [Authorization]
 *          description: get one time password
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 * 
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */
router.post("/get-otp" , UserAuthController.getOtp);


/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: check one time password
 *          tags: [Authorization]
 *          description: check one time password
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: one time code
 *              in: formData
 *              required: true
 *              type: string
 * 
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */
router.post("/check-otp" , UserAuthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: refresh token
 *          tags: [Authorization]
 *          description: refresh token
 *          parameters:
 *          -   name: refreshToken
 *              description: refreshToken
 *              in: formData
 *              required: true
 *              type: string
 * 
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */
router.post("/refresh-token" , UserAuthController.signRefreshToken);
module.exports = {
    UserAuthRoutes : router
}