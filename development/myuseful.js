window.MyUseFunc={
    url2para:function(url) {
        var cs=url.split("?")[1];
        var csz=cs.split("&");
        var para=[];
        var temp;
        for (var i = 0; i < csz.length; i++) {
            para[i]=[];
            temp=csz[i].split("=");
            para[i][0]=temp[0];
            para[i][1]=temp[1];
        };
        return para;
    },
    url2depara:function(url) {
        var para=this.url2para(url);
        for(var i = 0; i < para.length; i++){
            para[i][0]=decodeURIComponent(para[i][0]);
            para[i][1]=decodeURIComponent(para[i][1]);
        }
        return para;
    },
    url2encode:function(url) {
        var para=this.url2para(url);
        var enpara=encodeURIComponent(para[0][0])+"="+encodeURIComponent(para[0][1]);
        for(var i = 1; i < para.length; i++){
            enpara+="&"+encodeURIComponent(para[i][0])+"="+encodeURIComponent(para[i][1]);
        }
        return enpara;
    },
    createXHR:function(){
        if (typeof XMLHttpRequest != "undefined"){
            return new XMLHttpRequest();
        }else if (typeof ActiveXObject != "undefined"){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                "MSXML2.XMLHttp"],i, len;
        
                for (i=0,len=versions.length; i < len; i++){
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex){
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }else {
            throw new Error("No XHR object available.");
        }
    }
};
window.CookieUtil={
    get:function(name){
        var cookieName=encodeURIComponent(name)+"=",
        cookieStart=document.cookie.indexOf(cookieName);
        cookieValue=null;

        if (cookieStart>-1) {
            var cookieEnd=document.cookie.indexOf(";",cookieStart);
            if (cookieEnd==-1) {
                cookieEnd=document.cookie.length;
            }
            cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
        }
        return cookieValue;
    },
    set:function(name,value,expires,path,domain,secure){  
       var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);
       if(expires instanceof Date){  
            cookieText += "; expires=" + expires.toUTCString();  
       }  

       if(path){  
            cookieText += "; path=" + path;            
       }  

       if(domain){  
            cookieText += "; domain=" + domain;  
       }  

       if(secure){  
            cookieText += "; secure=" + secure;  
       }
       document.cookie=cookieText;
    },
    unset:function(name,path,domain,secure){
        this.set(name,"",new Date(0),path,domain,secure);
    }
};
window.EventUtil={
    addHandler:function(element,type,handler){
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    getButton:function(event){
        if (document.implementation.hasFeature("MouseEvents","2.0")) {
            return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                   return 0;
                case 2:
                case 6:
                   return 2;
                case 4:
                   return 1;
            }
        }
    },
    getCharCode:function(event){
        if (typeof event.charCode=="number") {
            return event.charCode;
        }else{
            return event.keyCode;
        }
    },
    getClipboardText:function(event){
        var clipboardData=(event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getRelatedTarget:function(event){
        if (event.relatedTarget) {
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    getWheelDelta:function(event){
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);
        }else{
            return -event.detail*40;
        }
    },
    preventDefault:function(event){
        if (event.preventDefault) {
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    removeHandler:function(element,type,handler){
        if (element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    setClipboardText:function(event,value){
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain",value);
        }else if (window.clipboardData) {
            return window.clipboardData.setData("text",value);
        }
    },
    stopPropagation:function(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    }
};