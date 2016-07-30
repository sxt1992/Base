window.onload=function(){tDraw(document.getElementById('myCanvas'));};
function tDraw(myCanvas) {
	if(!myCanvas||!myCanvas.getContext)return;
	taoCanvas.init(myCanvas);
}
var taoCanvas={
	init:function(myCanvas){
		this.canvas=myCanvas;
		this.ctx=myCanvas.getContext('2d');
		this.dIYpanel(this.ctx);
		this.eLeft=(function(e){
			var offset = e.offsetLeft;
			if(e.offsetParent != null) offset += arguments.callee(e.offsetParent);
			return offset;
		})(this.canvas);
		this.eTop=(function(e){
			var offset = e.offsetTop;
			if(e.offsetParent != null) offset += arguments.callee(e.offsetParent);
			return offset;
		})(this.canvas);
		alert(this.eLeft+"/"+this.eTop);
	},
	saveCanvas:function(ctx){//保存
		var img=new Image();
		img.src=this.canvas.toDataURL("image/png");
		document.body.appendChild(img);
	},
	dIYpanel:function(ctx){//自定义面板
		var that=this;
		ctx.fillStyle="black";
		ctx.fillRect(0,0,500,300);
		var onoff=false;
		var oldx=-10;
		var oldy=-10;
		var linecolor="white";
		var linw=4;
		
		var draw=function(event){
			if(onoff==true){
				var newx=event.pageX-that.eLeft;
				var newy=event.pageY-that.eTop;
				ctx.beginPath();
				ctx.moveTo(oldx,oldy);
				ctx.lineTo(newx,newy);
				ctx.strokeStyle=linecolor;
				ctx.lineWidth=linw;
				ctx.lineCap="round";
				ctx.stroke();

				oldx=newx;
				oldy=newy;
			}
		};
		var down=function(event){
			onoff=true;
			oldx=event.pageX-that.eLeft;
			oldy=event.pageY-that.eTop;
		};
		var up=function(){
			onoff=false;
		};
		this.canvas.addEventListener("mousemove",draw,true);
		this.canvas.addEventListener("mousedown",down,false);
		this.canvas.addEventListener("mouseup",up,false);
		document.getElementById('saveCanvas').onclick=function(){
			var img=new Image();
			img.src=that.canvas.toDataURL("image/png");
			document.body.appendChild(img);
		};
	},
	yinYing:function(ctx){//阴影
		ctx.shadowColor="#f00";
		ctx.shadowBlur=10;
		ctx.shadowOffsetX=20;
		ctx.shadowOffsetY=30;
		var img=new Image();
		img.onload=function(){
			ctx.drawImage(this,0,0);
		};
		img.src="flower.jpg";
	},
	colorHeChen:function(ctx){//颜色合成
		var moshi=["source-over","source-atop","source-in","source-out","destination-over","destination-atop","destination-in","destination-out","lighter","copy","source-over","xor"];
		ctx.fillStyle="#0f0";
		ctx.fillRect(10,10,50,50);
		ctx.globalCompositeOperation="xor";
		ctx.beginPath();
		ctx.fillStyle="#f00";
		ctx.arc(50,50,30,0,2*Math.PI);
		ctx.fill();
	},
	jianBian:function(ctx){//颜色渐变
		/*var grd=ctx.createLinearGradient(0,0,200,0);
		grd.addColorStop(0.1,"#0f0");
		grd.addColorStop(0.5,"#5b95d2");
		grd.addColorStop(0.8,"#f00");
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,200,100);*/
		var grd=ctx.createRadialGradient(100,100,20,100,100,100);
		grd.addColorStop(0,"#0f0");
		grd.addColorStop(0.5,"#5b95d2");
		grd.addColorStop(1,"#f00");
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,200,200);
	},
	transTest:function(ctx){
		//translate位移
		//scale绽放
		//rotate旋转
		//transform()
		//setTransform()
		ctx.beginPath();
		ctx.strokeStyle="#f00";
		ctx.scale(2.6,2.6);
		ctx.strokeRect(10,10,150,100);
		ctx.scale(1/2.6,1/2.6);
		ctx.beginPath();
		ctx.strokeStyle="#0f0";
		ctx.strokeRect(10,10,150,100);
	},
	imageTest:function(ctx){
		var img=new Image();
		img.onload=function(){
			imgW=this.width;imgH=this.height;
			//ctx.drawImage(this,0,0,this.width,this.height);
			var testCanvas=document.createElement("canvas");
			testCanvas.width=this.width;
			testCanvas.height=this.height;
			var testCanvasContext=testCanvas.getContext('2d');
			testCanvasContext.drawImage(this,0,0,this.width,this.height);
			var imgData=testCanvasContext.getImageData(0,0,this.width,this.height);
			for(var i=0;i<imgData.data.length;i+=4){
				var sumData=imgData.data[i]+imgData.data[i+1]+imgData.data[i+2];
				imgData.data[i]=sumData/3;
				imgData.data[i+1]=sumData/3;
				imgData.data[i+2]=sumData/3;
				//imgData.data[i+3]=;
			}
			ctx.putImageData(imgData,0,0,0,0,this.width,this.height);
		};
		img.src="flower.jpg";
	},
	drawTest3:function(ctx){
		/*ctx.fillStyle="#85ab12";
		ctx.font="30px Arial";
		ctx.fillText("陶雪焦",100,50,50);*/
		ctx.strokeStyle="#89b212";
		ctx.font="60px Arial";
		ctx.strokeText("陶雪焦",100,50,50);
	},
	drawTest2:function(ctx){
		//this.twoBezier(ctx,[[80,200],[250,80],[420,200]]);
		//this.threeBezier(ctx,[[80,200],[150,80],[350,120],[420,200]]);
		ctx.arc(100,100,40,0,2*Math.PI,true);
		ctx.clip();
		ctx.beginPath();
		ctx.fillStyle="#fd23ad";
		ctx.fillRect(0,0,500,300);
	},
	twoBezier:function(ctx,pots){
		//var ctx=this.ctx;
		/*var pots=[];
		pots[0]=[80,200];
		pots[1]=[250,80];
		pots[2]=[420,200];*/
		ctx.strokeStyle="blue";
		ctx.beginPath();
		ctx.moveTo(pots[0][0],pots[0][1]);
		ctx.quadraticCurveTo(pots[1][0],pots[1][1],pots[2][0],pots[2][1]);
		ctx.stroke();
		//point
		ctx.strokeStyle="red";
		ctx.beginPath();
		ctx.arc(pots[0][0],pots[0][1],3,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(pots[1][0],pots[1][1],3,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(pots[2][0],pots[2][1],3,0,2*Math.PI);
		ctx.stroke();

	},
	threeBezier:function(ctx,pots){
		//var ctx=this.ctx;
		/*var pots=[];
		pots[0]=[80,200];
		pots[1]=[150,80];
		pots[2]=[350,160];
		pots[3]=[420,200];*/
		ctx.strokeStyle="blue";
		ctx.beginPath();
		ctx.moveTo(pots[0][0],pots[0][1]);
		ctx.bezierCurveTo(pots[1][0],pots[1][1],pots[2][0],pots[2][1],pots[3][0],pots[3][1]);
		ctx.stroke();
		//point
		ctx.strokeStyle="red";
		ctx.beginPath();
		ctx.arc(pots[0][0],pots[0][1],3,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(pots[1][0],pots[1][1],3,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(pots[2][0],pots[2][1],3,0,2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(pots[3][0],pots[3][1],3,0,2*Math.PI);
		ctx.stroke();

	},
	drawTest:function(ctx){

		ctx.strokeStyle="blue";

		ctx.beginPath();
		//ctx.arc(100,100,70,0,130*Math.PI/180,true);
		//ctx.stroke();
		ctx.moveTo(20,20);
		ctx.lineTo(70,20);
		ctx.arcTo(120,20,120,70,30);
		ctx.lineTo(120,120);
		ctx.stroke();
		
		ctx.strokeStyle="green";
		ctx.beginPath();
		ctx.strokeRect(20,0,50,20);
		ctx.strokeRect(120,30,50,40);
		ctx.fillStyle="#855021";
		ctx.fillRect(20,140,150,80);

		ctx.clearRect(45,50,100,130);
		/*ctx.beginPath();
		ctx.strokeRect(10,10,90,20);

		ctx.strokeStyle="blue";*/

		/*ctx.lineCap="butt";
		ctx.beginPath();
		ctx.moveTo(10,10);
		ctx.lineTo(150,10);
		ctx.stroke();

		ctx.lineCap="round";
		ctx.beginPath();
		ctx.moveTo(10,40);
		ctx.lineTo(150,40);
		ctx.stroke();

		ctx.lineCap="square";
		ctx.beginPath();
		ctx.moveTo(15,70);
		ctx.lineTo(145,70);*/

		//ctx.stroke();
	}
};

