
var router = require('./_router');
const mainModel=require("../models/main");

router.get("/login",(req,res)=>{

    res.render("admin/login");

});

router.post("/login/data", async(req,res)=>{
    let name=req.body.user||"";
    let pwd=req.body.pwd||"";
    var userinfo=await mainModel.User.findOne({"name":name,"pwd":pwd});
    if(!userinfo){
        res.json(res.errorData("用户名与密码不匹配！"));
        return;
    }

    req.session.login={
        isLogin:true,
        code:1,
        user:userinfo
    }
    
    //console.log("login",req.session.login)
    res.json(res.successData(null,"登录成功！"))
    return;
});
router.get("/login/get", async(req,res)=>{
  
    res.json(req.session.login)
    return;
});

module.exports = router;