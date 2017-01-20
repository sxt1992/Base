(function(window){
	var myCanvas=document.getElementById('myCanvas');
	if(!myCanvas||!myCanvas.getContext){
		return;
	}
	var ctx=myCanvas.getContext('2d');window.ctx=ctx;

	var grd=ctx.createRadialGradient(150,150,150,450,150,50);
	for(var i=0;i<=1;i+=0.5){
		var rgb="rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
		grd.addColorStop(i,rgb);
	}
	console.log(rgb);

	ctx.fillStyle=grd;
	ctx.fillRect(0,0,600,300);

})(this);
// console.log(0);