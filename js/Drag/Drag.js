var Drag=function(){
	var drag=null;
	var diffX=0;
	var diffY=0;
	function addHandler(element,type,handler){
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    }
	function move(event){
		var event=event?event:window.event;
		var target=event.target||event.srcElement;
		switch(event.type){
			case "mousedown":
				if(target.className.indexOf("drag")>-1){
					drag=target;
					diffX=event.clientX-target.offsetLeft;
					diffY=event.clientY-target.offsetTop;
				}
				break;
			case "mousemove":
				if(drag!=null){
					drag.style.left=(event.clientX-diffX)+"px";
					drag.style.top=(event.clientY-diffY)+"px";
				}
				break;
			case "mouseup":
				drag=null;
				break;
		}	
	}
	return {
		enable:function(){
			addHandler(document,"mousedown",move);
			addHandler(document,"mousemove",move);
			addHandler(document,"mouseup",move);
		}
	};
}();