const  orm= require("./_mongoose");


var schema = new orm.mongoose.Schema({
    name:{type:String},
    code:{type:Number,required:true},
    createDate:{
        type:Date,default:Date.now
    }

});


var UserRule =orm.db.model("UserRule", schema);

module.exports = UserRule;