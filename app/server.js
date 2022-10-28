const express = require("express");
const {default : mongoose} = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { AllRoutes } = require("./router/router");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");


module.exports = class Application{
    #app = express();
    #DB_URI;
    #PORT;

    constructor(PORT,DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;

        this.connectToMongoDB();
        this.initRedis();
        this.configApplication();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
        
    }

    configApplication(){
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended:true}));
        this.#app.use(express.static(path.join(__dirname , ".." , "public")));
        this.#app.use("/api-doc" , swaggerUI.serve , swaggerUI.setup(
            swaggerJsDoc({
                swaggerDefinition : {
                    openapi : "3.0.0" ,
                    info : {
                        title : "Zeinab Store",
                        version : "1.0.0",
                        description : "My first website with NODEJS",
                        contact : {
                            name : "Zeinab Naderi",
                            url : "zeinab.com",
                            email : "zeinab.naderi001@gmail.com"
                    },
                   
                },
                servers : [
                    {url : "http://localhost:5000"}
                ]
                    
                 ,
                components : {
                    securitySchemes : {
                        BearerAuth : {
                            type : "http" ,
                            scheme : "bearer" ,
                            bearerFormat : "JWT"
                        }
                    }
                },
                security : [{BearerAuth : []}]
            },
                apis : ["./app/router/*/*.js"]
            }) ,
            {
                explorer : true
            }
        ))
    }

    createServer(){
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT , ()=>{
            console.log("server is running on http://localhost:" + this.#PORT);
        })
    }

    connectToMongoDB(){
        mongoose.connect(this.#DB_URI , (error)=>{
            if(!error) return console.log("connected to mongoDB");
            return console.log("failed to connect");
        })
        mongoose.connection.on("connected" , ()=>{
            console.log("mongoose connected");
        })
        mongoose.connection.on("disconnected" , ()=>{
            console.log("mongoose disconnected");
        })
        process.on("SIGINT", async()=>{
            await mongoose.connection.close();
            process.exit(0);
        })
    }

    initRedis(){
        require("./utils/init_redis");
    }
    createRoutes(){
        this.#app.use(AllRoutes);
    }

    errorHandling(){
        this.#app.use((req,res,next)=>{
            next(createError.NotFound("صفحه یافت نشد"))
        })

        this.#app.use((error,req,res,next)=>{
            const serverError = createError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;

            return res.status(statusCode).json({
                statusCode , message
            })
        })
    }
}