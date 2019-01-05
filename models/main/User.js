const  orm= require("./_mongoose");

// var childSchema = new dbHelp.mongoose.Schema({
  
// });

var schema = new orm.mongoose.Schema({
    name:{type:String},
    pwd:{type:String,
        minlength:[8,"最小长度为8位"]},
    createDate:{
            type:Date,
            default:Date.now
    },
    emall:{type:String},
    ruleId:{
        type:orm.mongoose.Schema.Types.ObjectId,
        ref:"UserRule"
    },
    price:{ type:Number,   min:[0,"min vlaue is 0"]}

    
});


var User =orm.db.model("User", schema);

module.exports = User;