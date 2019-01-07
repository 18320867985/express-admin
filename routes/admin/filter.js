
const router = require("./_router");

router.use("/", (req, res, next) => {

  if(req.session.login&&req.session.login.isLogin===true){
    next();
  }
  else{
    if (req.method.toLowerCase() == "get") {
      // request ajax
      if(req.path.toLowerCase().endsWith("data")){
        res.json({ status: "No access rights", code: 0, msg: "你没有访问的权限" });
        return;
      }else{   
         // request brm url
        res.redirect("/login");
        return;
      }
      
    } else {
       // request ajax
      res.json({ status: "No access rights", code: 0, msg: "你没有访问的权限" });
      return;
    }
  }

});

module.exports = router;