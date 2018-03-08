<template>
  <div>
    <div id="aboutme"></div>
  </div>
</template>
<script>
import '@/components/Aui-core-1.42-min';

const Aui = window.Aui;

export default {
  name: 'aboutme',
  data() {
    return {
      Effect: null,
      eventArr: [],
      allElem: [
        {
          content: '简介',
          bg: 'rgba(73, 117, 251, 0.7)'
        }, {
          content: '靓照',
          bg: 'rgba(146, 77, 230, 0.7)'
        }, {
          content: '教育',
          bg: 'rgba(239, 82, 82, 0.7)'
        }, {
          content: '经历',
          bg: 'rgba(245, 149, 0, 0.7)'
        }, {
          content: '爱好',
          bg: 'rgba(82, 167, 99, 0.7)'
        }, {
          content: '感悟',
          bg: 'rgba(203, 212, 12, 0.7)'
        }
      ]
    };
  },
  created() {
    const that = this;
    this.Effect = (a, w, h, s, p, x, y) => {
      function Effect3D(array, width, height, stage, per) {
        this.oDoc = document;
        this.stage = stage;
        this.width = width;
        this.height = height;
        this.path = array;
        this.domStr = '<dt id="shadow" class="bg-radial-gradient"></dt>';
        this.perspective = per;
        this.rotateX = x;
        this.rotateY = y;
        this.speedX = 0;
        this.speedY = 0;
      }
      Effect3D.prototype = {
        transform(_, value, key = 'transform') {
          const elem = _;
          ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach((pre) => { elem.style[pre + key] = value; });
          return elem;
        },
        addEvent(obj, sEvent, fn) {
          that.eventArr.push({ obj, sEvent, fn });
          obj.addEventListener(sEvent, fn, false);
        },
        onMouseWheel(e) {
          if (e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0) {
            if (this.perspective < 4000) {
              this.perspective += 150;
            }
          } else if (this.perspective > 350) {
            this.perspective -= 150;
          }
          this.transform(this.stage[0], `perspective(${this.perspective}px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`);
          if (e.preventDefault) {
            e.preventDefault();
          }
          return false;
        },
        startMove: function startMove(_) {
          const obj = _;
          obj.timer = obj.timer || null;
          clearInterval(obj.timer);
          obj.timer = setInterval(() => {
            this.rotateX -= this.speedY;
            this.rotateY += this.speedX;
            this.speedY *= 0.93;
            this.speedX *= 0.93;
            if (Math.abs(this.speedX) < 0.1 && Math.abs(this.speedY) < 0.1) {
              this.stopMove(obj.timer);
            }
            this.transform(obj, `perspective(${this.perspective}px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`);
          }, 30);
        },
        stopMove(t) {
          clearInterval(t);
        },
        init() {
          const self = this;
          Aui.each(self.path, (i) => {
            // eslint-disable-next-line
            const domStrFunc = function(wrap) {
              return `<div class="${wrap}" style="background:${that.allElem[i].bg};">
                        <div class="title">${that.allElem[i].content}</div>
                        <div class="cont">${that.allElem[i].content}</div>
                      </div>`;
            };
            self.domStr += `<dd>${domStrFunc('main')}${domStrFunc('over')}</dd>`;
          });
          Aui(self.stage).html(self.domStr);
          const oList = Aui('dd', self.stage);
          const sLen = self.path.length;
          const deg = 360 / sLen;
          // eslint-disable-next-line
          const tranZ = (self.width / 2 + 40) / Math.tan((360 / sLen / 2) * Math.PI / 180);
          let i = sLen;
          while (i > 0) {
            ((d) => {
              setTimeout(() => {
                const idx = sLen - d;
                // oThis.children[0].style.opacity = 0.2;
                self.transform(oList[idx], `rotateY(${idx * deg}deg) translateZ(${tranZ}px)`);
              }, d * 200);
            })(i);
            i -= 1;
          }
          const wheel = e => self.onMouseWheel.call(self, e || window.event);
          self.addEvent(self.oDoc, 'mousewheel', wheel);
          self.addEvent(self.oDoc, 'DOMMouseScroll', wheel);
          // const AuiDoc = Aui(self.oDoc);
          const seFn1 = (e1) => {
            const moveX = e1.clientX;
            const moveY = e1.clientY;
            const startX = self.rotateX;
            const startY = self.rotateY;

            let lastX = moveX;
            let lastY = moveY;
            self.speedX = 0;
            self.speedY = 0;
            const seFn2 = (e2) => {
              // eslint-disable-next-line
              self.rotateY = startY + (e2.clientX - moveX) / 10;
              // eslint-disable-next-line
              self.rotateX = startX - (e2.clientY - moveY) / 10;
              self.transform(self.stage[0], `perspective(${self.perspective}px) rotateX(${self.rotateX}deg) rotateY(${self.rotateY}deg)`);
              self.speedX = (e2.clientX - lastX) / 5;
              self.speedY = (e2.clientY - lastY) / 5;
              lastX = e2.clientX;
              lastY = e2.clientY;
            };
            const seFn3 = function mp() {
              this.onmousemove = null;
              this.onmouseup = null;
              self.startMove(self.stage[0]);
            };
            that.eventArr.push({ obj: self.oDoc, sEvent: 'mousemove', fn: seFn2 });
            that.eventArr.push({ obj: self.oDoc, sEvent: 'mouseup', fn: seFn3 });

            self.oDoc.addEventListener('mousemove', seFn2, false);
            self.oDoc.addEventListener('mouseup', seFn3, false);
            self.stopMove(self.stage[0].timer);
            return false;
          };
          that.eventArr.push({ obj: self.oDoc, sEvent: 'mousedown', fn: seFn1 });
          self.oDoc.addEventListener('mousedown', seFn1, false);
          return self;
        }
      };
      return new Effect3D(a, w, h, s, p);
    };
  },
  mounted() {
    // Aui.ready(() => {
    // });
    if (/ie/ig.test(Aui.browser())) {
      Aui('body').html('此页面含有IE（内核）浏览器不支持的效果，请用非IE（内核）浏览器打开！！！').setStyle({
        color: '#665284',
        'text-align': 'center',
        'font-size': '30px',
        'font-weight': 'bolder',
        'line-height': '150px'
      });
    } else {
      this.Effect(this.allElem.map(() => ''), 200, 300, Aui.byID('#aboutme'), 2000, -10, 0).init();
    }
  },
  beforeDestroy() {
    this.rmEvent();
  },
  beforeRouteLeave(to, from, next) {
    this.rmEvent();
    next();
  },
  methods: {
    rmEvent() {
      let e = this.eventArr.pop();
      while (e) {
        console.log(e.obj, e.sEvent);
        e.obj.removeEventListener(e.sEvent, e.fn, false);
        e = this.eventArr.pop();
      }
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/common.less';
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: initial;
  box-sizing: unset;
  user-select: none;
}
body {
  overflow: hidden;
  background: rgba(49, 148, 255, 0.04);
}

#aboutme {
  position:relative;
  width: 200px;
  height: 300px;
  margin: 150px auto 0;
  transform: rotateX(-10deg) rotateY(0deg) perspective(2000px);
  transform-style: preserve-3d;

  dd {
    position: absolute;
    left: 0;
    top: 0;
    width: 240px;
    height: 360px;
    border: 1px solid #666;
    transition:500ms all ease;

    .main, .over {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      cursor: default;

      .title {
        font-family: fzxzt;
        font-size: 30px;
      }
      .cont {
        font-family: hyxlsj;
        font-size: 16px;
      }
    }
    .over {
      top: 380px;
      opacity: 0.2;
      transform: scale(1,-1);
    }

  }
}

#shadow{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1200px;
  height: 1200px;
  margin-left: -600px;
  margin-top: -510px;
  transform: translateY(200px) rotateX(90deg);
}
</style>
