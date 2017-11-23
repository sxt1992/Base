<template>
    <div class="home">
      <header>
        <nav>
          <span>木兮的网站</span>
          <ul class="nav-title">
            <li v-for="item,index in ['首\t页','文\t章','游\t迹','留\t言','关\t于']"
                @click="navActive = index"
                :class="{active: index === navActive}">{{item.replace(/\t/g, '&nbsp;')}}</li>
          </ul>
          <ul class="login-about">
            <li>登&nbsp;录</li>
            <li>|</li>
            <li>注&nbsp;册</li>
          </ul>
        </nav>
        <div class="banner"></div>
      </header>
      <main>
        <div class="article-nav-line">
          <div class="article-nav-wrap">
            <ul class="article-nav">
              <li v-for="item,index in ['热\t门\t推\t荐','技\t术\t分\t享','随\t笔\t写\t意']"
                  @click="articleNavActive = index"
                  :class="{active: index === articleNavActive}">
                    <span>{{item.replace(/\t/g, '&nbsp;')}}</span>
                    <em></em>
              </li>
            </ul>
            <div class="publish-new">
              <img src="../../assets/images/pen.gif">
              <em>发表</em>
            </div>
          </div>
        </div>
        <div class="article-main">
          <div class="article-list">
            <h3>热门推荐</h3>
            <ul>
              <li v-for="index in 10">
                <div class="article-auth">
                  <p>
                    <i class="icons-time"></i>
                    <em>Oct 06, 2017</em>
                  </p>
                  <p>
                    <i class="icons-me"></i>
                    <em>woodsi</em>
                  </p>
                </div>
                <div class="article-pre">
                  <b>正儿八经得思考有点怪{{index}}</b>
                  <div class="article-pre-cont">博客更新的断断续续，126邮箱也收到很多网友的来信，很感谢大家对叶子博客的关注。其实，入行五年了，我觉得自己进步不是那么大。偶尔看看书，也是静不下心来。有的人说了，或许年龄越大，功利性太强了，走着走着似乎忘记了自己的初心。</div>
                  <p class="article-opr">
                    <span><i class="icons-pl"></i><em>评论(100)</em></span>
                    <span><i class="icons-ll"></i><em>浏览(100)</em></span>
                    <span><i class="icons-dz"></i><em>点赞(100)</em></span>
                  </p>
                </div>
              </li>
            </ul>
            <div>{{curPage}}</div>
            <Page :page-size="15" :total="totalItem"></Page>
            <div class="pagination" :current="curPage">
              <em>每页15条{{"\uF3D2\uF3D3\u2022\u2022\u2022"}} #2d8cf0 #666/ 共237条</em>
              <b @click="pageUp" :class="{'not-up': curPage < 2}">
                <i class="icons-page-left"></i>
              </b>
              <b @click="pageClick(1)" :style="{color: curPage == 1? 'red': '#000'}">1</b>
              <b v-show="curPage > 4" @click="pageSomeUp">
                <i class="icons-page-ellipsis ellipsis-up"></i>
              </b>
              <b v-for="item in pageArr" @click="pageClick(item)" :style="{color: curPage == item? 'red': '#000'}">{{item}}</b>
              <b v-show="curPage < Math.ceil(totalItem/15) - 3" @click="pageSomeDown">
                <i class="icons-page-ellipsis ellipsis-down"></i>
              </b>
              <b v-show="Math.ceil(totalItem/15) > 1" @click="pageClick(Math.ceil(totalItem/15))" :style="{color: curPage == Math.ceil(totalItem/15)? 'red': '#000'}">{{Math.ceil(totalItem/15)}}</b>
              <b @click="pageDown" :class="{'not-down': curPage > Math.ceil(totalItem/15) - 1}">
                <i class="icons-page-right"></i>
              </b>
            </div>
          </div>
          <div class="article-about">
            <div class="article-about-item">
              <h3>关于作者</h3>
              <div class="about-me">
                <div class="me-pic">
                  <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=828278738,2158381752&fm=11&gp=0.jpg">
                  <div class="me-resume">
                    <p>陶雪焦，2016年毕业于浙江理工大学，现就职于杭州大搜车，专注web前端领域。</p>
                    <p>邮箱：<a href="mailto:taoxj1992@163.com">taoxj1992@163.com</a></p>
                    <p>关注我：<a href="#">新浪微博</a><a href="#">知乎</a></p>
                  </div>
                </div>
                <div class="me-say">
                  上周我做了个demo，使用SVG实现了一个彩条圆环倒计时效果，使用SVG实现的优点是兼容性非常好，不足在于学习成本比较高，于是我就琢磨有没有更简单的方法实现类似的多彩圆环渐变效果，最好纯CSS就能搞定。绞尽脑汁想出了下面三种实现
                </div>
              </div>
            </div>
            <div class="article-about-item">
              <h3>最新文章</h3>
              <ul class="new-article">
                <li v-for="index in 8"><b>{{index}}. </b><a href="#">重新解读常见的排序算法</a></li>
              </ul>
            </div>
            <div class="article-about-item">
              <h3>广告</h3>
              <div class="article-ad">
                这是广告
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>Copyright &copy;{{new Date().getFullYear()}} <a href="#">WoodXi</a>. All rights reserved.</p>
        <p>Designed by <a href="#">WoodXi</a> | <a href="javascript:;">浙ICP备 15005679号</a></p>
        <p>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002012836">
            <img ondragstart="return false" onselectstart="return false" src="../../assets/images/beian.png">
            <em>浙公网安备 33011002012836号</em>
          </a>
        </p>
      </footer>
    </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      navActive: 1, // 当前对应nav
      articleNavActive: 0,
      curPage: 1,
      pageArr: [],
      totalItem: 150,
    };
  },
  created() {
    const pageSize = Math.ceil(this.totalItem / 15);
    if (pageSize > 3) {
      this.pageArr = [2, 3];
    } else if (pageSize > 2) {
      this.pageArr = [2];
    }
  },
  methods: {
    pageUp() {
      if (this.curPage < 2) {
        return;
      }
      const c = this.curPage - 1;
      const arr = [];
      if (c > 1 && c < Math.ceil(this.totalItem / 15)) {
        arr.push(c);
      }
      if (c > 2) {
        arr.unshift(c - 1);
      }
      if (c > 3) {
        arr.unshift(c - 2);
      }
      if (c < Math.ceil(this.totalItem / 15) - 1) {
        arr.push(c + 1);
      }
      if (c < Math.ceil(this.totalItem / 15) - 2) {
        arr.push(c + 2);
      }

      this.curPage = c;
      this.pageArr = arr;
    },
    pageSomeUp() {
      let c = this.curPage - 5;
      while (c < 1) {
        c += 1;
      }
      const arr = [];
      if (c > 1 && c < Math.ceil(this.totalItem / 15)) {
        arr.push(c);
      }
      if (c > 2) {
        arr.unshift(c - 1);
      }
      if (c > 3) {
        arr.unshift(c - 2);
      }
      if (c < Math.ceil(this.totalItem / 15) - 1) {
        arr.push(c + 1);
      }
      if (c < Math.ceil(this.totalItem / 15) - 2) {
        arr.push(c + 2);
      }
      this.curPage = c;
      this.pageArr = arr;
    },
    pageClick(item) {
      const c = item;
      const arr = [];
      if (c > 1 && c < Math.ceil(this.totalItem / 15)) {
        arr.push(c);
      }
      if (c > 2) {
        arr.unshift(c - 1);
      }
      if (c > 3) {
        arr.unshift(c - 2);
      }
      if (c < Math.ceil(this.totalItem / 15) - 1) {
        arr.push(c + 1);
      }
      if (c < Math.ceil(this.totalItem / 15) - 2) {
        arr.push(c + 2);
      }
      this.curPage = c;
      this.pageArr = arr;
    },
    pageSomeDown() {
      let c = this.curPage + 5;
      while (c > Math.ceil(this.totalItem / 15) - 1) {
        c -= 1;
      }
      const arr = [];
      if (c > 1 && c < Math.ceil(this.totalItem / 15)) {
        arr.push(c);
      }
      if (c > 2) {
        arr.unshift(c - 1);
      }
      if (c > 3) {
        arr.unshift(c - 2);
      }
      if (c < Math.ceil(this.totalItem / 15) - 1) {
        arr.push(c + 1);
      }
      if (c < Math.ceil(this.totalItem / 15) - 2) {
        arr.push(c + 2);
      }
      this.curPage = c;
      this.pageArr = arr;
    },
    pageDown() {
      if (this.curPage > Math.ceil(this.totalItem / 15) - 1) {
        return;
      }
      const c = this.curPage + 1;
      const arr = [];

      if (c > 1 && c < Math.ceil(this.totalItem / 15)) {
        arr.push(c);
      }
      if (c > 2) {
        arr.unshift(c - 1);
      }
      if (c > 3) {
        arr.unshift(c - 2);
      }
      if (c < Math.ceil(this.totalItem / 15) - 1) {
        arr.push(c + 1);
      }
      if (c < Math.ceil(this.totalItem / 15) - 2) {
        arr.push(c + 2);
      }

      this.curPage = c;
      this.pageArr = arr;
    },
  },
};
</script>
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
    height: 220px;
    margin-bottom: 8px;
    background: url(../../assets/images/headerBg.jpg) no-repeat;
    background-size: cover;
    box-shadow: 0 0 10px;
  }
}
.home {
  main {
    background: rgba(49, 148, 255, 0.04);;
    .article-nav-line {
      border-bottom: 2px solid #eaeeee;
      background: #fff;
      user-select: none;

      .article-nav-wrap {
        display: flex;
        justify-content: space-between;
        width:1200px;
        height: 62px;
        margin:auto;

        .article-nav {
          float: left;
          height: 100%;
          display: flex;
          line-height: 62px;

          li {
            position: relative;
            margin-right: 30px;
            cursor: pointer;
            &.active {
              em {
                position: absolute;
                bottom: -2px;
                width: 100%;
                height: 0;
                border-bottom: 2px solid #57a3f3;
                &:after {
                  position: absolute;
                  top: -5px;
                  left: 50%;
                  content: "";
                  width: 0;
                  height: 0;
                  margin-left: -5px;
                  border-left: 5px solid transparent;
                  border-right: 5px solid transparent;
                  border-bottom: 6px solid #57a3f3;
                }
              }
            }
          }
        }
        .publish-new {
          display: flex;
          justify-content: center;
          width: 130px;
          height: 36px;
          margin-top: 13px;
          color: #fff;
          font-size: 18px;
          line-height: 36px;
          border-radius: 100px;
          background: #5fadff;
          user-select: none;
          cursor: pointer;
          box-shadow: 0px 1px 3px #000;

          img {
            width: 20px;
            height: 20px;
            margin-top: 8px;
            margin-right: 10px;
          }
          &:active {
            margin-top: 14px;
            box-shadow: 0px 2px 4px #111;
          }
        }
      }
    }
    .article-main {
      width: 1200px;
      margin: auto;
      overflow: hidden;
      .article-list {
        float: left;
        width: 790px;

        h3 {
          height: 54px;
          margin: 16px 0 0;
          font-size: 18px;
          line-height: 54px;
          color: #408294;
          border-bottom: 2px solid #bcdafa;
        }
        ul {
          li {
            box-sizing: content-box;
            height: 138px;
            padding-top: 20px;
            border-bottom: 1px solid #ddd;
            overflow: hidden;

            .article-auth {
              float: left;
              width: 160px;
              padding-top: 2px;
              overflow: hidden;

              p {
                margin: 0 0 4px;
                padding: 0;
                overflow: hidden;

                i {
                  float: left;
                  width: 20px;
                  height: 20px;
                  margin-right: 6px;
                  background-repeat: no-repeat;
                  background-size: 100% 100%;

                  &.icons-time {
                    background-image: url(../../assets/images/time.png);
                  }
                  &.icons-me {
                    background-image: url(../../assets/images/me.png);
                  }
                }
                em {
                  float: right;
                  width: 134px;
                  font-size: 12px;
                  word-wrap: break-word;
                  word-break: break-all;
                }
              }
            }
            .article-pre {
              float: right;
              width: 610px;

              &>b {
                color: #407f90;
                font-weight: bold;
                font-size: 16px;
                cursor: pointer;

                &:hover {
                  color: #0b657d;
                  text-decoration: underline;
                }
              }
              .article-pre-cont {
                margin-top: 10px;
                color: #777;
                font-size: 12px;
              }
              .article-opr {
                float: right;
                height: 30px;
                margin: 0;
                margin-top: 10px;
                padding: 0;
                overflow: hidden;
                user-select: none;

                span {
                  margin-left: 8px;
                  cursor: pointer;

                  i {
                    display: inline-block;
                    vertical-align: middle;
                    width: 18px;
                    height: 18px;
                    margin-right: 2px;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;

                    &.icons-pl {
                      background-image: url(../../assets/images/pl.png);
                    }
                    &.icons-ll {
                      background-image: url(../../assets/images/ll.png);
                    }
                    &.icons-dz {
                      background-image: url(../../assets/images/dz.png);
                    }
                  }
                  em {
                    display: inline-block;
                    vertical-align: middle;
                    color: #999;
                    font-size: 12px;
                  }
                }
              }

            }
          }
        }
      }
      .article-about {
        float: right;
        width: 360px;

        .article-about-item {
          >h3 {
            height: 54px;
            margin: 16px 0 10px;
            font-size: 18px;
            line-height: 54px;
            color: #666;
            border-bottom: 1px solid #ccc;
          }
          .about-me {
            font-size: 13px;
            .me-pic {
              overflow: hidden;
              img {
                float: left;
                width: 100px;
                height: 120px;
              }
              .me-resume {
                float: right;
                width: 250px;
                p {
                  margin: 0;
                  margin-top: 10px;
                  a {
                    margin-left: 6px;
                    color: @hrefColor;
                    text-decoration: none;

                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }
            .me-say {
              margin-top: 8px;
            }
          }
          .new-article {
            li {
              height: 26px;
              b {
                font-style: italic;
                font-weight: bold;
                font-size: 16px;
                font-family: 'Times New Roman';
              }
              a {
                color: @hrefColor;
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
}
footer {
  margin: 20px auto;
  p {
    height: 16px;
    margin: auto;
    padding: 0;
    font-size: 12px;
    line-height: 16px;
    text-align: center;

    a {
      color: @hrefColor;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
    em {
      font-style: normal;
      font-weight: normal;
    }
    img {
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: bottom;
    }
  }
}
.pagination {
  height: 32px;
  font-family: Arial;
  overflow: hidden;
  em {
    float: left;
    margin-right: 20px;
    line-height: 32px;
    font-family: fontIcons;
  }
  b {
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #dddee1;
    box-sizing: content-box;
    cursor: pointer;

    i {
      display: block;
      width: 16px;
      height: 16px;
      margin-top: 7px;
      margin-left: 7px;
      background-image: url(../../assets/images/icons.png);
      background-position-y: 0;

      &.icons-page-left{
        background-position-x: -32px;
      }
      &.icons-page-ellipsis{
        background-position-x: -96px;
      }
      &.ellipsis-up {
        &:hover {
          background-position-x: 0;
        }
      }
      &.ellipsis-down {
        &:hover {
          background-position-x: -16px;
        }
      }
      &.icons-page-right{
        background-position-x: -48px;
      }
    }
    &.not-up {
      cursor: not-allowed;
      .icons-page-left{
        background-position-x: -64px;
      }
    }
    &.not-down {
      cursor: not-allowed;
      .icons-page-right{
        background-position-x: -80px;
      }
    }
  }
}

@keyframes navmove
{
  from {height:30px;}
  to {height:70px;}
}
</style>
