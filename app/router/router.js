const { graphqlHTTP } = require("express-graphql");
const { checkRole } = require("../http/middleweares/permission.guard");
const { verifyAccesstoken } = require("../http/middleweares/verifyAccessToken");
const { graphqlConfig } = require("../utils/graphql.config");
const redisClient = require("../utils/init_redis");
const { AdminRoutes } = require("./admin/admin");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const { DeveloperRoutes } = require("./user/developer.routes");

(async()=>{
    await redisClient.set("key" , "value");
    await redisClient.get("key");
})()

const router = require("express").Router();

router.use("/user"  ,UserAuthRoutes)
router.use("/developer" , DeveloperRoutes)
router.use("/admin"  ,verifyAccesstoken, AdminRoutes)
router.use("/graphql"  , graphqlHTTP(graphqlConfig))
router.use("/" , HomeRoutes)


module.exports = {
    AllRoutes : router
}