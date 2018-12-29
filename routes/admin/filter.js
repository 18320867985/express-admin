
const router = require("./index");

router.use((req, res,next) => {
  let user=  req.session["user"]||{login:false};
 if(user.login===true){
    next();
 }else{
     res.json({status:"No access rights",code:0,msg:"你没有访问的权限"});
     return;
 }
    
});

module.exports = router;