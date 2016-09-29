(function(){
var wRate=window.innerWidth/640;
/*var css=`
body{margin:0;pading:0;}
.tao{width:${300*wRate}px;background:red;}
.xue{width:${640*wRate}px;background:blue;}
`;*/
var css = "\nbody{margin:0;pading:0;}\n.tao{width:" + 300 * wRate + "px;background:red;}\n.xue{width:" + 640 * wRate + "px;background:blue;}\n";
var style=document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
})();