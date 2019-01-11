
var express = require("express");
var router = express.Router();
var path = require("path");
var formidable = require("formidable"); //上传文件

router.get("/", (req, res) => {
    res.render("admin/file.html");
});

router.post("/", (req, res) => {

    try {

        let _url = "./public/upload";
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = path.resolve(_url);
        form.multiples = false;
        form.parse(req, (err, fileds, files) => {

            // 写入数据库
            if (err) {
                res.json(res.err(err));
                return;
                //throw err;
            }

            var _path = files.file.path;
            var p = path.dirname(_path);
            var extname = path.extname(_path);
            var basename = path.basename(_path);
            let url = "public/upload/" + basename;
            res.json(res.ok(url));

        });

    } catch (error) {
        res.json(res.err(error));
        return;
    }
});

module.exports = router;