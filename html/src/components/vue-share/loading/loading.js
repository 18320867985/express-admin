/*loading 插件*/

export default function (bl, el, loadingText) {

   
    if (typeof bl !== "boolean") {
        bl = true;
    }
    
    var body="body";
    var _loadingText = "正在加载数据...";

    if(arguments.length===1){
        body="body";
        bl=bl;
   }
    if(arguments.length===2){
        bl=bl;
        body="body";
        _loadingText = el
    }
    if(arguments.length===3){
        bl=bl;
        body=el;
        _loadingText=loadingText;
    }
  

    if (bl) {

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

