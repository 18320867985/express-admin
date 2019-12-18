export const test = {

    init() {

        $(function () {

            // 收藏商品  
                $.confirm("", "是打发第三方",
                    // success
                    function (e) {
                        console.log("点击了确认");
                        $.info("提示内容信息：点击了确认按钮", "success");
                    },
                    
                );
           

        });

    }


};