/*loading 插件*/

export default function (bl, el, loadingText) {

   var bl2=true;
    var body="body";
    var _loadingText = "正在加载数据...";

    if(arguments.length===1){
        if (typeof bl === "boolean") {
            bl2=bl;
        }else{
            _loadingText=bl;
            bl2=true;
        }
   }
    if(arguments.length===2){
        bl2=bl;
        _loadingText = el
    }
    if(arguments.length===3){
        bl2=bl;
        body=el;
        _loadingText=loadingText;
    }
  

    if (bl2) {

        var text = ` <div class="loading-box">
               <div class="loading-content">
                    <span  class="iconfont icon-loading spin"></span>
                    <span class="loading-text">${_loadingText}</span>
                  </div>
                                        
    	</div>`;

        $(body).append(text);

    } else {
        $(".loading-box", el).remove();
    }

}

