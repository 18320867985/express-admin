
const router = require("./_router");

// filter
//require("./filter");

router.get("/index",(req,res)=>{
    res.render("admin/index",{});
});

router.get("/index/data",(req,res)=>{
    if(req.session.login&&req.session.login.isLogin){
        res.json(res.ok(req.session.login.user));
        return;  
    }else{
        res.json(res.err());
        return;  
    }
   
});


// user
require("./user");

// userRule
require("./userRole");

// rotation
require("./rotation");

module.exports = router;