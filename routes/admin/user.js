
const router = require("./index");

router.get("/user", (req, res) => {

    res.send("user");
    return;
});

module.exports = router;