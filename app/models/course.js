const {default : mongoose, model} = require("mongoose");
const { CommentSchema } = require("./public.schema");

const EpisodeSchema = new mongoose.Schema({
    title : {type : String , required : true},
    text : {type : String , default : ""},
    type : {type : String , default : "unlock"},
    time : {type : String , required : true},
    videoAddress : {type : String , required : true}
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
    time : {type : String , default : "00:00:00"},
    status : {type : String , default : "notStarted"} , //notStarted , onGoing , completed
    teacher : {type : mongoose.Types.ObjectId , ref : "user"},
    chapters : {type : [ChapterSchema] , default : [] , required : true} ,
    students : {type : [mongoose.Types.ObjectId] , ref : "user" , default : []}
})

CourseSchema.index({title : "text" , short_text : "text" , text : "text"});

module.exports = {
    CourseModel : model("course" , CourseSchema)
}