//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var nunjucks = require('nunjucks');
var app = express();
var isdev=true;

app.use(logger('dev'));
app.use(express.json());                           // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// session
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true
    }
}));

app.use("/public",express.static(path.join(__dirname, 'public')));

// 配合前端打包工具使用 前端打包文件夹html
let ueditorDir, ueditorUpload, htmlStatic, nunjucksDir;

// dev
if(isdev){
ueditorUpload = path.join(__dirname, 'html/src');
ueditorDir = path.join(__dirname, 'html/src/ueditor');
htmlStatic = path.join(__dirname, 'html/src/static');
nunjucksDir = path.join(__dirname, 'html/src/views');
}else{
// release
 ueditorUpload=path.join(__dirname, 'html/dist');
 ueditorDir=path.join(__dirname, 'html/dist/ueditor');
 htmlStatic=path.join(__dirname, 'html/dist/static');
 nunjucksDir=path.join(__dirname, 'html/dist/views');
}
app.use("/static", express.static(htmlStatic));
app.use("/ueditor", express.static(ueditorDir));

app.set('view engine', 'html'); //   设置扩展名
nunjucks.configure(nunjucksDir, {
    autoescape: true,
    express: app,
    //throwOnUndefined :true
});


// 跨域CORS
app.use(function (req, res, next) {
    var reqOrigin = req.header("origin");
    if (reqOrigin != undefined) {
        res.header("Access-Control-Allow-Origin", "*");   // * 表示所有站点可以访问,单个指定例如：http://localhost:8888
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    }
    next();

});

// 返回处理的数据
app.use((req, res, next) => {

    // success return data
    res.ok = (data, desc) => {
        let o= {
            status: "success",
            code: 1,
            data,
        }

        if( typeof data !="undefined"&& desc  instanceof Object){
            for(name in desc){
                o[name]=desc[name];
            }
            return o;
        }
        o.desc=desc;
        return o;
    };

    // error return data
    res.err = (data, desc) => {
        let o= {
            status: "error",
            code: 0,
            data,
        }

        if( typeof data !="undefined"&& desc instanceof Object){
            for(name in desc){
                o[name]=desc[name];
            }
            return o;
        }
        o.desc=desc;
        return o;
    };

    next();
});

// route 
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin/index');
let file = require('./routes/file');
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/file', file);

// ueditor
var ueditor = require("ueditor");
app.use("/ueditor/ue", ueditor(ueditorUpload, function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/ueditor/upload-img/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render("404.html");
});


module.exports = app;
