
// 文章
const orm = require("./_mongoose");

// var childSchema = new orm.mongoose.Schema({
//     ttl: {
//         type: String,
//         default: ""
//     },
//     url: {
//         type: String,
//         default: ""
//     },
//     src: {
//         type: String,
//         default: ""
//     },
//     order: {
//         type: Number,
//         default: 1
//     }
// });

var schema = new orm.mongoose.Schema({
    title: {
        type: String,
        default:""
    },
    code:{
        type:String,
        required:true,
        default:""
    },
    desc: {
        type: String,
        default: ""
    },
    content:{
        type:String,
        default:""
    },
    order: {
        type: Number,
        default: 1
    },
    createdt: {
        type: Date,
        default: Date.now
    },
   

   
});


var Article = orm.db.model("Article", schema);

module.exports = Article;