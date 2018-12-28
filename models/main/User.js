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
    ruleId:{
        type:orm.mongoose.Schema.Types.ObjectId,
        ref:"UserRule"
    }

    
});


var User =dbHelp.db.model("User", schema);

module.exports = User;