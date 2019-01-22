/*mongoose model*/
exports.orm = require("./_mongoose");

// models
exports.User = require("./User");

exports.UserRole = require("./UserRole");

exports.Rotation = require("./Rotation"); // 轮播图

exports.Banner = require("./Banner"); // 页面banner大图
