<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>demo1</title>
    <meta name="keywords" content="txj,demo1" />
    <meta name="description" content="this is demo1" />
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
<script>
!function(window){
    window.document.write("<meta name='viewport' content='initial-scale=0.5,minimum-scale=0.5,maximum-scale=0.5,user-scalable=no'>");
    var resizeEvt='orientationchange' in window?'orientationchange':'resize';
    var createStyle=function(event){
        window.rem=window.innerWidth/20;
        window.document.getElementsByTagName('html')[0].style.fontSize=rem+"px";
        var style;
        if(style=window.document.getElementById("forHtml")){
            style.parentNode.removeChild(style);
        }
        style = window.document.createElement("style");
        style.id="forHtml";
        style.appendChild(window.document.createTextNode("html{font-size:"+rem+"px !important;}"));
        window.document.head.appendChild(style);
    };
    window.addEventListener(resizeEvt,createStyle,false);
    window.document.addEventListener('DOMContentLoaded',createStyle,false);
}(this);
</script>
<script>
/*eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('!e(1){1.3.q("<p o=\'n\' s=\'u-6=0.5,t-6=0.5,v-6=0.5,j-i=m\'>");8 h=\'9\'l 1?\'9\':\'k\';8 4=e(r){1.7=1.E/H;1.3.G(\'b\')[0].2.J=7+"a";8 2;w(2=1.3.K("f")){2.F.z(2)}2=1.3.y("2");2.x="f";2.c(1.3.A("b{B-D:"+7+"a !C;}"));1.3.M.c(2)};1.d(h,4,g);1.3.d(\'I\',4,g)}(L);',49,49,'|window|style|document|createStyle||scale|rem|var|orientationchange|px|html|appendChild|addEventListener|function|forHtml|false|resizeEvt|scalable|user|resize|in|no|viewport|name|meta|write|event|content|minimum|initial|maximum|if|id|createElement|removeChild|createTextNode|font|important|size|innerWidth|parentNode|getElementsByTagName|20|DOMContentLoaded|fontSize|getElementById|this|head'.split('|'),0,{}));*/
</script>
<script type="text/javascript">
(function(a){var p=parseInt(a.screen.width)/640;a.document.write('<meta name="viewport" content="width=640,minimum-scale='+p+',maximum-scale='+p+',user-scalable=no,target-densitydpi=device-dpi">');})(window);
</script>
<script type="text/javascript">
/*var phoneScale = parseInt(window.screen.width) / 640;
document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', user-scalable=no,target-densitydpi=device-dpi">');*/
</script>
</head>
<body onload="a()">
<script type="text/javascript" charset="utf-8">
function a(){
    document.body.innerHTML="<br>"+
        "屏幕分辨率为："+screen.width+"*"+screen.height +"<br />"+
        "屏幕可用大小："+screen.availWidth+"*"+screen.availHeight +"<br />"+
        "网页可见区域宽："+document.body.clientWidth +"<br />"+
        "网页可见区域高："+document.body.clientHeight +"<br />"+
        "网页可见区域宽(包括边线的宽)："+document.body.offsetWidth +"<br />"+
        "网页可见区域高(包括边线的宽)："+document.body.offsetHeight +"<br />"+
        "网页正文全文宽："+document.body.scrollWidth +"<br />"+
        "网页正文全文高："+document.body.scrollHeight +"<br />"+
        "网页被卷去的高："+document.body.scrollTop +"<br />"+
        "网页被卷去的左："+document.body.scrollLeft +"<br />"+
        "网页正文部分上："+window.screenTop +"<br />"+
        "网页正文部分左："+window.screenLeft +"<br />"+
        "屏幕分辨率的高："+window.screen.height +"<br />"+
        "屏幕分辨率的宽："+window.screen.width +"<br />"+
        "屏幕可用工作区高度："+window.screen.availHeight +"<br />"+
        "屏幕可用工作区宽度："+window.screen.availWidth
        ;
}
</script>
</body>
</html>