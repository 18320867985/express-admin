
 // js主打包入口
 
module.exports={
	// 模块列表
	list:[
		"index",
		"admin",
		"news",
		"test",
		"spa", // 单页应用
	],
	
	dir:"./src/modules/",   // 默认文件父级
	watch:"spa",               // 监听和打包当前的模块，
	isWatchAll:false     		// 为true=>时监听和打包所有模块  
	
}


