
var router = require('./_router');

//router.get("/",(req,res)=>{
//    res.render("admin/reg");
//});
router.post("/", async (req, res) => {
    // 没有相关数据
    res.json(res.ok([{name:"123"}], {
     
    }));
 });

module.exports = router;