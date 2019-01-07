
const router = require("./_router");
const mainModel=require("../../models/main");

router.get("/user", (req, res) => {
  
    res.send("ser");
    return;
});

router.get("/user/data", (req, res) => {

    res.send("user");
    return;
});

router.post("/user/data", (req, res) => {

    res.send("user");
    return;
});

router.put("/user/data", (req, res) => {

    res.send("user");
    return;
});

router.delete("/user/data:id", (req, res) => {

    res.send("user");
    return;
});


module.exports = router;