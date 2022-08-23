const express = require("express");
const {default : mongoose} = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");

module.exports = class Application{
    #app = express();
    #DB_URI;
    #PORT;

    constructor(PORT,DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;

        this.connectToMongoDB();
        this.configApplication();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }

    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended:true}));
        this.#app.use(express.static(path.join(__dirname , ".." , "public")));
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
    }

    createRoutes(){
        this.#app.use(AllRoutes);
    }

    errorHandling(){
        this.#app.use((req,res,next)=>{
            return res.status(404).json({
                statusCode : 404 , message : "آدرس موردنظر یافت نشد"
            })
        })

        this.#app.use((error,req,res,next)=>{
            const statusCode = error.status || 500;
            const message = error.message || "internal server error";

            return res.status(statusCode).json({
                statusCode , message
            })
        })
    }
}