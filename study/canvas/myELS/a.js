window.onload=function(){tDraw(416,640,"show");};
function tDraw(w,h,wrapper,theData){
	var canvas=document.createElement("canvas");
	canvas.width=w;
	canvas.height=h;
	canvas.innerHTML="Your browser doesn't support the HTML5 CANVAS tag.";
	canvas.style.display="block";
	canvas.style.margin="auto";
	canvas.style.cursor="default";
	canvas.style.borderRadius="8px";
	document.getElementById(wrapper).appendChild(canvas);
	if(!canvas||!canvas.getContext)return;
	var taoCanvas={
		init:function(myCanvas,data){
			this.canvas=myCanvas;
			this.ctx=this.canvas.getContext('2d');
			this.data=data;
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
			this.eW=this.canvas.width||300;
			this.eH=this.canvas.height||150;

			this.colors=[[0,228,39],[228,222,0],[228,0,39],[156,19,228],[228,98,0],[0,78,228],[0,228,228]];
			this.xCnt=13;
			this.wh=this.eW/this.xCnt;
			this.yCnt=Math.round(this.eH/this.wh);

			this.typeAll={0:[[1,0],[0,1],[1,1],[2,1]],1:[[0,0],[0,1],[1,1],[0,2]],2:[[0,0],[1,0],[2,0],[1,1]],3:[[0,1],[1,0],[1,1],[1,2]],4:[[0,0],[0,1],[1,1],[2,1]],5:[[0,0],[1,0],[0,1],[0,2]],6:[[0,0],[1,0],[2,0],[2,1]],7:[[1,0],[1,1],[1,2],[0,2]],8:[[0,0],[1,0],[2,0],[0,1]],9:[[0,0],[1,0],[1,1],[1,2]],10:[[2,0],[2,1],[1,1],[0,1]],11:[[0,0],[0,1],[0,2],[1,2]],12:[[1,0],[1,1],[0,1],[0,2]],13:[[0,0],[1,0],[1,1],[2,1]],14:[[0,0],[0,1],[1,1],[1,2]],15:[[1,0],[2,0],[0,1],[1,1]],16:[[0,0],[0,1],[0,2],[0,3]],17:[[0,0],[1,0],[2,0],[3,0]],18:[[0,0],[1,0],[0,1],[1,1]]};
			this.typeArr={0:[[0,1,0],[1,1,1]],1:[[1,0],[1,1],[1,0]],2:[[1,1,1],[0,1,0]],3:[[0,1],[1,1],[0,1]],4:[[1,0,0],[1,1,1]],5:[[1,1],[1,0],[1,0]],6:[[1,1,1],[0,0,1]],7:[[0,1],[0,1],[1,1]],8:[[1,1,1],[1,0,0]],9:[[1,1],[0,1],[0,1]],10:[[0,0,1],[1,1,1]],11:[[1,0],[1,0],[1,1]],12:[[0,1],[1,1],[1,0]],13:[[1,1,0],[0,1,1],],14:[[1,0],[1,1],[0,1]],15:[[0,1,1],[1,1,0]],16:[[1],[1],[1],[1]],17:[[1,1,1,1]],18:[[1,1],[1,1]]};
			// {0:[width,height]}
			this.typeWh={0:[3,2],1:[2,3],2:[3,2],3:[2,3],4:[3,2],5:[2,3],6:[3,2],7:[2,3],8:[3,2],9:[2,3],10:[3,2],11:[2,3],12:[2,3],13:[3,2],14:[2,3],15:[3,2],16:[1,4],17:[4,1],18:[2,2]};
			this.typeClass=[[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,3],[14,15],[16,17],[18]];
			this.panelMap=

			this.draw();
		},
		draw:function(){
			var ctx=this.ctx;
			/*ctx.fillStyle="rgb(255,0,0)";
			ctx.rect(50,50,100,100);
			ctx.clearRect(0,0,this.eW,this.eH);
			ctx.fill();*/

			/*ctx.fillStyle="rgb("+this.colors[0]+")";
			ctx.fillRect(100,100,50,50);

			var grd=ctx.createLinearGradient(0,0,200,0);
			grd.addColorStop(0,"#0f0");
			grd.addColorStop(1,"#f00");
			ctx.fillStyle=grd;
			ctx.fillRect(100,100,200,100);*/
			/*for(var i=0;i<this.colors.length;i++){
				this.drawColorRect(20+i*32,50,this.colors[i],32);
			}*/
			/*for(var i=6;i<=18;i++){
				var x=(i%3)*4*32;
				var y=Math.floor((i-6)/3)*4*32;
				this.graphType(i,x,y,this.colors[Math.round(Math.random()*(this.colors.length-1))],32);
			}*/
			this.drawGrid();

			/*ctx.save();
			ctx.rect(50,50,100,100);

			ctx.fillStyle="rgb(0,0,255)";
			ctx.save();
			ctx.rect(50,200,100,100);

			ctx.clearRect(0,0,this.eW,this.eH);

			ctx.restore();
			ctx.fill();

			ctx.restore();
			ctx.fill();
*/
		},
		drawGrid:function(){
			var ctx=this.ctx;
			ctx.strokeStyle="rgba(150,150,150,0.6)";
			ctx.lineWidth=2;
			for(var i=1;i<this.xCnt;i++){
				ctx.beginPath();
				ctx.moveTo(i*this.wh,0);
				ctx.lineTo(i*this.wh,this.eH);
				ctx.stroke();
			}
			for(var i=1;i<this.yCnt;i++){
				ctx.beginPath();
				ctx.moveTo(0,i*this.wh);
				ctx.lineTo(this.eW,i*this.wh);
				ctx.stroke();
			}
			ctx.fillStyle="rgba(0,0,0,0.5)";
			ctx.fillRect(0,0,this.eW,this.eH);
		},
		clear:function(){
			this.ctx.clearRect(0,0,this.eW,this.eH);
		},
		typeGenerate:function(){
			// [0,1,2,3]
			// [4,5,6,7]
			// [8,9,10,11]
			// [12,3]
			// [14,15]
			// [16,17]
			// [18]

			/*// {0:[width,height]}
			var typeWh={0:[3,2],1:[2,3],2:[3,2],3:[2,3],4:[3,2],5:[2,3],6:[3,2],7:[2,3],8:[3,2],9:[2,3],10:[3,2],11:[2,3],12:[2,3],13:[3,2],14:[2,3],15:[3,2],16:[1,4],17:[4,1],18:[2,2]};
			var graph=[[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,3],[14,15],[16,17],[18]];*/
			var subGraph=this.typeClass[Math.round(Math.random()*(this.typeClass.length-1))];
			var n=subGraph[Math.round(Math.random()*(subGraph.length-1))];
			var x=Math.round(Math.random()*(this.xCnt-this.typeWh[n][0]));
			var y=-this.typeWh[n][1];
			var color=this.colors[Math.round(Math.random()*(this.colors.length-1))];
			this.graphType(n,x*this.wh,y*this.wh,color,this.wh);
			return {type:n,x:x,y:y,color:color};
		},
/* 
case 0:
	   ---
	   ---
	---------
	---------
case 1:
	---
	---
	------
	------
	---
	---
case 2:
	---------
	---------
	   ---
	   ---
case 3:
	   ---
	   ---
	------
	------
	   ---
	   ---
case 4:
	---
	---
	---------
	---------
case 5:
	------
	------
	---
	---
	---
	---
case 6:
	---------
	---------
	      ---
	      ---
case 7:
	   ---
	   ---
	   ---
	   ---
	------
	------
case 8:
	---------
	---------
	---
	---
case 9:
	------
	------
	   ---
	   ---
	   ---
	   ---
case 10:
	      ---
	      ---
	---------
	---------
case 11:
	---
	---
	---
	---
	------
	------
case 12:
	   ---
	   ---
	------
	------
	---
	---
case 13:
	------
	------
	   ------
	   ------
case 14:
	---
	---
	------
	------
	   ---
	   ---
case 15:
	   ------
	   ------
	------
	------
case 16:
	---
	---
	---
	---
	---
	---
	---
	---
case 17:
	------------
	------------
case 18:
	------
	------
	------
	------
 */
		graphType:function(n,x,y,colorArr,wh){
			// [0,1,2,3]
			// [4,5,6,7]
			// [8,9,10,11]
			// [12,3]
			// [14,15]
			// [16,17]
			// [18]
			if(this.typeAll[n]){
				var fs=this.typeAll[n];
				this.drawColorRect(x+wh*fs[0][0],y+wh*fs[0][1],colorArr,wh);
				this.drawColorRect(x+wh*fs[1][0],y+wh*fs[1][1],colorArr,wh);
				this.drawColorRect(x+wh*fs[2][0],y+wh*fs[2][1],colorArr,wh);
				this.drawColorRect(x+wh*fs[3][0],y+wh*fs[3][1],colorArr,wh);
				return true;
			}
			return false;
		},
		drawColorRect:function(x,y,colorArr,wh){
			var ctx=this.ctx;
			var hIn=Math.round(wh*0.2);
			var whIn=wh-hIn*2;
			var xIn=x+hIn;
			var yIn=y+hIn;
			var newColorArr=[];
			var cD=0;

			//center
			ctx.fillStyle="rgb("+colorArr+")";
			ctx.fillRect(xIn,yIn,whIn,whIn);

			//up
			cD=70;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			var grd=ctx.createLinearGradient(x,0,x+wh+10,0);
			grd.addColorStop(0,"#fff");
			grd.addColorStop(1,"rgb("+newColorArr+")");
			ctx.fillStyle=grd;

			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+wh,y);
			ctx.lineTo(xIn+whIn,yIn);
			ctx.lineTo(xIn,yIn);
			ctx.fill();

			//right
			cD=-50;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			ctx.fillStyle="rgb("+newColorArr+")";

			ctx.beginPath();
			ctx.lineTo(x+wh,y);
			ctx.lineTo(x+wh,y+wh);
			ctx.lineTo(xIn+whIn,yIn+whIn);
			ctx.lineTo(xIn+whIn,yIn);
			ctx.fill();

			//down
			cD=-60;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			ctx.fillStyle="rgb("+newColorArr+")";
			
			ctx.beginPath();
			ctx.lineTo(x+wh,y+wh);
			ctx.lineTo(x,y+wh);
			ctx.lineTo(xIn,yIn+whIn);
			ctx.lineTo(xIn+whIn,yIn+whIn);
			ctx.fill();

			//left
			cD=50;
			for(var i=0;i<3;i++){
				if(colorArr[i]+cD>0){
					if(colorArr[i]+cD<255){
						newColorArr[i]=colorArr[i]+cD;
					}else{
						newColorArr[i]=255;
					}
				}else{
					newColorArr[i]=0;
				}
			}
			ctx.fillStyle="rgb("+newColorArr+")";
			
			ctx.beginPath();
			ctx.lineTo(x,y+wh);
			ctx.lineTo(x,y);
			ctx.lineTo(xIn,yIn);
			ctx.lineTo(xIn,yIn+whIn);
			ctx.fill();

		}
	};
	taoCanvas.init(canvas,theData);
}

var taoCanvas33={
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