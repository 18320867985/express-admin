
var router = require('./_router');
const mainModel = require("../models/main");

router.get("/login", async (req, res) => {
    
    res.render("admin/login");

});

router.get("/login/not", async (req, res) => {
    
    res.render("/admin/not");

});

router.post("/login/data", async (req, res) => {

      // 多文档事务 
//       let session= await mainModel.orm.db.startSession();
//       session.startTransaction({
//       readConcern:{level:"available"},
//       writeConcern:{w:"majority"},
//   });
//     var men=50;
//     try {

//      var  t1=  await  mainModel.User.findByIdAndUpdate("5c3078aada9a5214d8905675",{$inc:{
//             price:-men
//         }

//     },{new:true,session});

//         if(t1.price<0){
//             throw    new Error("er");
//         }

//         var  t2  = await  mainModel.User.findByIdAndUpdate("5c3094f534b332275cff5a86",{$inc:{
//             price:men
//         }},{new:true,session });
//         if(t2.price<0){
//             throw    new Error("er");
//         }

//         await  session.commitTransaction();
//     } catch (error) {
//         console.log(error)
//        await  session.abortTransaction();
//     }

//     return ;

    let name = req.body.user || "";
    let pwd = req.body.pwd || "";
    var userinfo = await mainModel.User.findOne({ "name": name, "pwd": pwd });
    if (!userinfo) {
        res.json(res.err("用户名与密码不匹配！"));
        return;
    }

    req.session.login = {
        isLogin: true,
        code: 1,
        user: userinfo
    }

    res.json(res.ok(null, "登录成功！"))
    return;
});

router.post("/logout/data", (req, res) => {
    if (req.session.login) {
        req.session.login.isLogin = false;
        req.session.login.code = 0;
        req.session.login.user = null
    }
    res.json(res.ok("ok"));
    return;
});

module.exports = router;