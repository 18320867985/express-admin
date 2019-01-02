
const router = require("./_router");
const mainModel=require("../../models/main");

router.get("/user", (req, res) => {
    
    res.send(res.send(req.session.test));
    return;
});

router.get("/user/data", (req, res) => {

    res.send("user");
    return;
});



module.exports = router;