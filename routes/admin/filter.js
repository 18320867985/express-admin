
const router = require("./_router");

router.use("/",(req, res,next) => {
  // console.log("filter",req.session.login)
      if(!req.session.login){
         res.json({status:"No access rights",code:0,msg:"你没有访问的权限"});
         return;
      }
    if( !req.session.login.isLogin){
      res.json({status:"No access rights",code:0,msg:"你没有访问的权限"});
      return;
    }

    next();

    
});

module.exports = router;