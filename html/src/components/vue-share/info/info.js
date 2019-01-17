

import $ from "../dom.js";
 export default function (type,mess) {

    mess = mess || "信息提示框";
    $(".messageinfo").remove();
    var _class = "default";
    if(typeof type === "number") {
        switch(type) {
            case 0:
                _class = "default";
                break;
            case 1:
                _class = "success";
                break;
            case 2:
                _class = "warning";
                break;
            case 3:
                _class = "danger";
                break;
            default:
                _class = "default";
        }
    } else if(typeof type === "string") {
        switch(type) {
            case "default":
                _class = "default";
                break;
            case "success":
                _class = "success";
                break;
            case "warning":
                _class = "warning";
                break;
            case "danger":
                _class = "danger";
                break;
            default:
                _class = "default";
        }

    }

    // 创建message
    var message = document.createElement("div");
    message.setAttribute("class", "messageinfo");

    var message_box = document.createElement("div");
    message_box.setAttribute("class", "info-box");

    var ttl = document.createElement("h4");
    ttl.setAttribute("class", "ttl " + _class);
    ttl.innerText = mess;

    message_box.appendChild(ttl);
    message.appendChild(message_box);

    var elm = document.body || document.documentElement;
    elm.appendChild(message);


    var setTimeoutId = setTimeout(function() {
       // $(".messageinfo").addClass("info-hide");
        clearTimeout(setTimeoutId);
        $(".messageinfo").remove();
        
    }, 2000);


}
