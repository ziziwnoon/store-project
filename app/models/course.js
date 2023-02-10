const {default : mongoose, model} = require("mongoose");
const { getTotalTimeOfCourse } = require("../utils/functions");
const { CommentSchema } = require("./public.schema");

const EpisodeSchema = new mongoose.Schema({
    title : {type : String , required : true},
    text : {type : String , default : ""},
    type : {type : String , default : "unlock"},
    time : {type : String , required : true},
    videoAddress : {type : String , required : true}
} , {toJSON : {virtuals : true}})
EpisodeSchema.virtual("videoURL").get(function(){
    return `${process.env.BASE_url}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
})

const ChapterSchema = new mongoose.Schema({
    title : {type : String , required : true},
    text : {type : String , required : true},
    episodes : {type : [EpisodeSchema] , default : []}
})
const CourseSchema = new mongoose.Schema({
    title : {type : String , required : true},
    short_text : {type : String , required : true},
    text : {type : String , required : true},
    image : {type : String , required : true},
    tags : {type : [String] , default : []},
    category : {type : mongoose.Types.ObjectId , ref : "category"},
    comments : {type : [CommentSchema] , default : []},
    likes : {type : [mongoose.Types.ObjectId] , default : []},
    dislikes : {type : [mongoose.Types.ObjectId] , default : []},
    bookmark : {type : [mongoose.Types.ObjectId ], default : []},
    price : {type : Number},
    discount : {type : Number , default : 0},
    type : {type : String , default : "free"}, //free,paid,VIP
    status : {type : String , default : "notStarted"} , //notStarted , onGoing , completed
    teacher : {type : mongoose.Types.ObjectId , ref : "user"},
    chapters : {type : [ChapterSchema] , default : [] , required : true} ,
    students : {type : [mongoose.Types.ObjectId] , ref : "user" , default : []}
} , {toJSON : {virtuals : true}})

CourseSchema.index({title : "text" , short_text : "text" , text : "text"});

CourseSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_url}:${process.env.APPLICATION_PORT}/${this.image}`
})
CourseSchema.virtual("totalTime").get(function(){
    return getTotalTimeOfCourse(this.chapters)
})


module.exports = {
    CourseModel : model("course" , CourseSchema)
}