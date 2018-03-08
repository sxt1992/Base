<template>
    <div class="travel">
      <header>
        <nav>
          <span>木兮的网站</span>
          <ul class="nav-title">
            <li v-for="item,index in ['首 页','文 章','游 迹','留 言','关 于']"
                @click="checkoutNav(index)"
                :class="{active: index === curNav}">{{item}}</li>
          </ul>
          <ul class="login-about">
            <li>登&nbsp;录</li>
            <li>|</li>
            <li>注&nbsp;册</li>
          </ul>
        </nav>
        <div class="banner">
          <div class="travel-gray-bg">
            <div class="show-this-year">
              <div class="left-section">
                <h2>致即将逝去的2017年</h2>
                <p>它的面庞，有着俊俏冷漠却不孤傲的英雄气质。前格栅采用六边形的大嘴设计，并引入星空的设计理念，90颗镀铬装饰，散发出闪耀的光芒，如同星河璀璨，与全LED犀利大灯相互搭配，相得益彰，形成良好的视觉感官效果。车身方面，整体车身线条十分硬朗，刚劲有力，给人一种武士硬汉一般的感觉</p>
              </div>
              <div class="right-section">
                <div class="pic-list"
                     v-for="item,index in showThisYear"
                     @click="seeDetail(item)"
                     @mouseout="showMouseout(item)"
                     @mousemove="showMousemove($event, item)"
                     :style="{background: item.color, transform: item.tf}">
                  <div>
                    <div class="pic-title">{{item.type}}</div>
                    <div class="pic-logo">{{['\u2645','\u2646','\u2698','\u269a','\u262b','\u2655','\u2656'][index%7]}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <h2>往年足迹</h2>
        <div class="timelinewrapper">
          <!-- end 000000000000000000000 -->
          <div class="jazz-timeline-wrapper" id="skrollr-body">
            <div class="jazz-timeline dark-timeline ultimate-style">

                <div class="timeline-post" v-for="_,index in 20"
                   :class="['blue', 'grey', 'orange', 'pink', 'green', 'red', 'brown', 'indigo', 'purple', 'opal', 'turqoise', 'black', 'white'][index%12]+'-post'"
                >
                    <div class="timeline-meta">
                      <div class="meta-details">2017.07.12</div>
                    </div>
                    <div class="timeline-icon icon-dot">
                        <div class="timeline-bar"></div>
                    </div>
                    <div class="timeline-content"
                    data--20-bottom-top="opacity:0;top:-10%;transform:rotate(180deg);"
                    data--50-bottom-bottom="opacity:1;top:3%;transform:rotate(0deg);transform-origin:0 0;">
                        <h2 class="content-title"
                            :class="['blue', 'grey', 'orange', 'pink', 'green', 'red', 'brown', 'indigo', 'purple', 'opal', 'turqoise', 'black', 'white'][index%12]+'-title'"
                        > Christmas Day </h2>
                        <div class="content-details">
                            <div>Christmas or Christmas Day is an annual festival commemorating the birth of Jesus Christ,
                            observed most commonly on December 25 as a religious and cultural celebration among billions
                            of people around the world. </div>
                        </div>
                    </div><!-- timeline content -->
                </div><!-- .timeline-post -->

            </div><!-- .timeline -->
        </div><!-- .jazz-timeline-wrapper -->
        <!-- end 000000000000000000000 -->
        </div>
      </main>
    </div>
</template>
<script>
const skrollr = require('@/components/timeline/skrollr.min');

export default {
  name: 'travel',
  data() {
    return {
      curNav: 2,  // 当前对应导航
      showThisYear: [
        {
          tf: '',
          type: '南昌',
          color: 'rgba(73, 117, 251, 0.7)',
          cont: 'move'
        }, {
          tf: '',
          type: '杭州',
          color: 'rgba(146, 77, 230, 0.7)',
          cont: 'your'
        }, {
          tf: '',
          type: '成都',
          color: 'rgba(239, 82, 82, 0.7)',
          cont: 'cursor'
        }, {
          tf: '',
          type: '重庆',
          color: 'rgba(245, 149, 0, 0.7)',
          cont: 'over'
        }, {
          tf: '',
          type: '三星堆',
          color: 'rgba(82, 167, 99, 0.7)',
          cont: 'move2'
        }, {
          tf: '',
          type: '横店',
          color: 'rgba(203, 212, 12, 0.7)',
          cont: 'your2'
        }
      ]
    };
  },
  mounted() {
    skrollr.init();
  },
  updated() {
    // skrollr.init();
  },
  methods: {
    checkoutNav(index) {
      this.curNav = index;
      if (index === 1) {
        this.$router.push({ path: '/' });
      } else if (index === 2) {
        this.$router.push({ path: '/Travel' });
      } else if (index === 4) {
        let href = window.location.href;
        let ind = href.indexOf('#');

        if (ind < 0) {
          href = href.substring(0, ind);
        }
        ind = href.indexOf('/');
        href = href.substring(0, ind + 1);
        window.location.href = `${href}aboutMe.html`;
      }
    },
    seeDetail(item) {
      window.console.log(item);
    },
    showMouseout(item) {
      // eslint-disable-next-line
      item.tf = 'perspective(300px) rotateY(0deg) rotateX(0deg)';
    },
    showMousemove(e, item) {
      const w = 240;
      const h = 240;
      // eslint-disable-next-line
      const y = (e.offsetX - w * 0.5) / w * 45;
      // eslint-disable-next-line
      const x = (1 - (e.offsetY - h * 0.5)) / h * 45;
      // eslint-disable-next-line
      item.tf = `perspective(300px) rotateX(${x}deg) rotateY(${y}deg)`;
    }
  }
};
</script>
<style lang="less">
@import "../../components/timeline/timeline.css";
body {
  background: rgba(49, 148, 255, 0.1);
}
</style>

<style scoped lang="less">
@hrefColor: #33b399;
header {
  user-select: none;

  nav {
    width: 1200px;
    height: 70px;
    margin: auto;
    color: #55b1bb;

    span {
      float: left;
      margin-right: 120px;
      font-size: 26px;
      line-height: 70px;
      color: #57a3f3;
      letter-spacing: 0;
      text-shadow: 0 1px #82b8f1, 0 2px #907474, 0 3px #497548, 0 4px #396d62, 0 5px #3a5d5d, 0 6px #374246, 0 7px #d8a069, 0 8px #9e5a72;
    }
    .nav-title {
      float: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      li {
        width: 76px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        text-shadow: 0px 1px 0px #bcdafa;
        cursor: pointer;

        &.active {
          color: #fff;
          text-shadow: none;
          border-radius: 6px;
          background: rgba(95, 173, 255, 0.93);
        }
      }
    }
    .login-about {
      float: right;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      li {
        text-shadow: 0px 1px 0px #bcdafa;
        cursor: pointer;

        &:nth-of-type(2) {
          margin: 0 10px;
        }

        &:active {
          font-weight: bold;
        }
      }
    }
  }
  .banner {
    width: 100%;
    min-width: 1200px;
    min-height: 220px;
    margin-bottom: 8px;
    background: url(../../assets/images/headerBg.jpg) no-repeat;
    background-size: cover;
    box-shadow: 0 0 10px;

    .travel-gray-bg {
      width: 100%;
      height: 100%;
      min-height: 220px;
      background: rgba(73, 164, 199, 0.9);

      .show-this-year {
        width: 1200px;
        margin: auto;
        padding: 10px 0;
        overflow: hidden;

        .left-section {
          float: left;
          width: 360px;
          margin-left: 18px;

          h2 {
            height: 50px;
            margin: 20px 0 10px;
            color: #fff;
            font-size: 30px;
            line-height: 50px;
            text-align: center;
            word-wrap: break-word;
            word-break: break-all;
          }
          p {
            margin: 0;
            color: #fff;
            text-indent: 30px;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
        .right-section {
          float: right;
          width: 738px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;

          .pic-list {
            width: 220px;
            height: 220px;
            margin: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            /*flex: none;*/
            box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
            transition: all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
            border-radius: 8px;
            cursor: pointer;

            .pic-title {
              color: #d8d8d8;
              font-size: 28px;
              line-height: 100%;
              font-family: picTypes;
              text-align: center;
            }
            .pic-logo {
              color: rgba(255, 255, 255, 0.7);
              font-size: 96px;
              line-height: 100%;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

main {
  padding-top: 50px;

  &>h2 {
    height: 60px;
    margin-bottom:20px;
    color: #4a83eb;
    font-weight: normal;
    font-size: 40px;
    line-height: 60px;
    text-align: center;
    word-wrap: break-word;
    word-break: break-all;
    text-shadow: 1px 1px 1px #F25B5A;
  }
  .timelinewrapper {}
}
</style>
