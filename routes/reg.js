
var router = require('./_router');
const mainModel=require("../models/main");

router.get("/reg",(req,res)=>{
    res.render("admin/reg");
});
router.post("/reg/data", async (req, res) => {

     let user= new mainModel.User({name:req.body.user,pwd:req.body.pwd,email:req.body.email,price:100});
 //  var o=  await mainModel.UserRule.create(new mainModel.UserRule({name:"普通用户",code:0}));
     let rule= await mainModel.UserRule.findOne({code:0}); //普通用户
     if(!rule){
         res.json(res.errorData(rule));
         return;
     }
     user.ruleId=rule._id
     let isok= user.validateSync();
      if(isok){
         res.json(res.errorData(isok));
         return;
      }
     var  userinfo= await mainModel.User.create(user)
     if(!userinfo){
        res.json(res.errorData("注册失败"));
        return;
     }
     req.session.login={
        isLogin:true,
        code:1,
        user:userinfo
    }
      res.json(res.successData(userinfo))
 });

module.exports = router;