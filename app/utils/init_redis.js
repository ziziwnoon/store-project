const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect" , ()=>console.log("redis is connecting"));
redisClient.on("ready" , ()=>console.log("redis connected"));
redisClient.on("error" , (err)=>console.log("redis error is: ",err.message));
redisClient.on("end" , ()=>console.log("redis disconnected"));

module.exports = redisClient;