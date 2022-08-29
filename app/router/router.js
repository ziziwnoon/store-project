const redisClient = require("../utils/init_redis");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");

(async()=>{
    await redisClient.set("key" , "value");
    await redisClient.get("key");
})()

const router = require("express").Router();

router.use("/user" , UserAuthRoutes)
router.use("/" , HomeRoutes)


module.exports = {
    AllRoutes : router
}