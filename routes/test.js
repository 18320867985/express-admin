
var router = require('./_router');
const mainModel=require("../models/main");

router.get("/data", async (req, res) => {
    var pras = req.query;
    debugger;
    res.json(res.ok([{name:"get"}], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem:100 //  总条数
    }));
});
router.post("/", async (req, res) => {
    debugger;
    res.json(res.ok([{name:"post"}], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem: 100 //  总条数
    }));

});

router.put("/", async (req, res) => {
    debugger;
    res.json(res.ok([{ name: "put" }], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem: 100 //  总条数
    }));

});

router.delete("/", async (req, res) => {
    debugger;
    res.json(res.ok([{ name: "detele" }], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem: 100 //  总条数
    }));

});



module.exports = router;