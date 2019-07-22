
var router = require('./_router');
const mainModel = require("../models/main");
const cpy = require("../lib/crypto");

router.get("/login", async (req, res) => {
    
    res.render("admin/login");

});

router.get("/login/not", async (req, res) => {
    
    res.render("/admin/not");

});

router.post("/login/data", async (req, res) => {

    let name = req.body.user || "";
    let pwd =cpy.md5( req.body.pwd);
    var userinfo = await mainModel.User.findOne({  name,pwd });
    if (!userinfo) {
        res.json(res.err("用户名与密码不匹配！"));
        return;
    }

    req.session.login = {
        isLogin: true,
        code: 1,
        user: userinfo
    };

    res.json(res.ok(null, "登录成功！"));
    return;
});

router.post("/logout/data", (req, res) => {
    if (req.session.login) {
        req.session.login.isLogin = false;
        req.session.login.code = 0;
        req.session.login.user = null;
    }
    res.json(res.ok("ok"));
    return;
});

module.exports = router;