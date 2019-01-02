
const router = require("./_router");

router.use("/", (req, res, next) => {

  if (!req.session.login) {
    if (req.method.toLowerCase() == "get") {
      res.redirect("/login");
      return;
    } else {
      res.json({ status: "No access rights", code: 0, msg: "你没有访问的权限" });
      return;
    }

  }
  if (!req.session.login.isLogin) {
    if (req.method.toLowerCase() == "get") {
      res.redirect("/login");
      return;
    } else {
      res.json({ status: "No access rights", code: 0, msg: "你没有访问的权限" });
      return;
    }
  }

  next();


});

module.exports = router;