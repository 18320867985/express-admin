
const router = require("./_router");

router.use("/", (req, res, next) => {

  if(req.session.login&&req.session.login.isLogin===true){
    next();
  }
  else{
    if (req.method.toLowerCase() == "get") {
      res.redirect("/login");
      return;
    } else {
      res.json({ status: "No access rights", code: 0, msg: "你没有访问的权限" });
      return;
    }
  }

});

module.exports = router;