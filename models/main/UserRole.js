const  orm= require("./_mongoose");


var schema = new orm.mongoose.Schema({
    name:{type:String},
    code:{type:Number,
        index:true,
        unique:true  },
    createDate:{
        type:Date,default:Date.now
    }

});


var UserRole =orm.db.model("UserRole", schema);

module.exports = UserRole;