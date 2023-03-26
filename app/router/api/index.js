const homeController = require("../../http/controllers/api/home.controller");
const { verifyAccesstoken } = require("../../http/middleweares/verifyAccessToken");
const { apiPaymentRoutes } = require("./payment");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description : IndexPage routes
 */
/**
 * @swagger
 *  /:
 *      get:
 *          summary: index of routes
 *          tags: [IndexPage]
 *          description: get all data for index page
 *          parameters:
 *              -   in: header
 *                  name: accesstoken
 *                  example: Bearer YourToken
 *          responses:
 *              200:
 *                  description: success
 *              404:
 *                  description: not Found
 */

router.get("/" ,verifyAccesstoken, homeController.indexPage);
router.use(apiPaymentRoutes)

module.exports = {
    HomeRoutes : router
}