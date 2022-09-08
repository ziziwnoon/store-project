const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../../utils/functions");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: Developers
 *  description : Developers utils
 */
/**
 * @swagger
 *  /developer/hash-password/{password}:
 *      get:
 *          summary: hash data
 *          tags: [Developers]
 *          description: hash data
 *          parameters:
 *          -   in: path
 *              name: password
 *              required: true
 *              type: string
 * 
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/hash-password/:password" , (req,res,next)=>{
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password , salt))
})

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          summary: random number
 *          tags: [Developers]
 *          description: random number
 * 
 *          responses:
 *              200:
 *                  description: success
 */
 router.get("/random-number" , (req,res,next)=>{
    return res.send(randomNumberGenerator().toString())
})


module.exports={
    DeveloperRoutes : router 
}