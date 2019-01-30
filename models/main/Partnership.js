// 招商合作
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
    name: {
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
    order: {
        type: Number,
        default: 1
    },
    createdt: {
        type: Date,
        default: Date.now
    },
   
    addr:{
        type:String,
        default:""
    },
    tel:{
        type:String,
        default:""
    }

   
});


var Partnership = orm.db.model("Partnership", schema);

module.exports = Partnership;