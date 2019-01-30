
// 服务网点
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
        index: true,
        unique: true
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
    compna:{
        type:String,
        default:""
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


var Contact = orm.db.model("Contact", schema);

module.exports = Contact;