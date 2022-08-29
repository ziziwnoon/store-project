const homeController = require("../../http/controllers/api/home.controller");
const { verifyAccesstoken } = require("../../http/middleweares/verifyAccessToken");
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

module.exports = {
    HomeRoutes : router
}