const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError =  require("http-errors");

function createRoute(req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();

    const directory = path.join(__dirname , ".." , ".." , "public" , "uploads" , "blog" , year , month , day);
    req.body.fileUploadPath = path.join("uploads" , "blog" , year , month , day);
    fs.mkdirSync(directory , {recursive : true});
    return directory;
}

const storage = multer.diskStorage({
    destination : (req,file,callback)=>{
        if(file.originalname){
            const filePath = createRoute(req);
            return callback(null , filePath);
        }
        callback(null , null);
    },
    filename : (req,file,callback)=>{
        if(file.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext)
            req.body.fileName = fileName;
            return callback(null , fileName)
        }
        callback(null , null);
    }
})

function fileFilter(req,file,cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg" , ".webp" , ".png" , ".jpeg" , ".gif"]
    if(mimetypes.includes(ext)){
        return cb(null , true)
    }
    return cb(createError.BadRequest("فرمت ارسالی صحیح نیست"))
}

const maxSize = 5 * 1000 * 1000;

const uploadFile = multer({storage, fileFilter , limits :{fileSize :maxSize}}) 

module.exports = {
    uploadFile
}