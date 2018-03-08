<template>
    <div class="home">
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
        <div class="banner"></div>
      </header>
      <main>
        <div class="article-nav-line">
          <div class="article-nav-wrap">
            <ul class="article-nav">
              <li v-for="item,index in ['热 门 推 荐','技 术 分 享','随 笔 写 意']"
                  @click="curArticle = index"
                  :class="{active: index === curArticle}">
                    <span>{{item}}</span>
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
                    <i class="icons-time">&#xf3f4;</i>
                    <em>Oct 06, 2017</em>
                  </p>
                  <p>
                    <i class="icons-me">&#xf213;</i>
                    <em>woodsi</em>
                  </p>
                </div>
                <div class="article-pre">
                  <b>vue about{{index}}</b>
                  <div class="article-pre-cont">Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。</div>
                  <p class="article-opr">
                    <span><i>&#xf11a;</i><em>评论(100)</em></span>
                    <span><i>&#xf133;</i><em>浏览(100)</em></span>
                    <span class="span-dz"><i>&#xf251;</i><em>点赞(100)</em></span>
                  </p>
                </div>
              </li>
            </ul>
            <div class="pagination" :current="curPage">
              <em>每页15条 / 共{{totalItem}}条</em>
              <b @click="pageCount(-1)" :class="{'not-up-down': curPage < 2}">&#xf3d2;</b>
              <b @click="pageCount(1)" :class="{active: curPage == 1}">1</b>
              <b v-show="curPage > 4" @click="pageCount(-2)" class="double-arrow">
                <i>&#x2022;&#x2022;&#x2022;</i>
                <i>&#xf3d2;&#xf3d2;</i>
              </b>
              <b v-for="item in pageArr" @click="pageCount(item)" :class="{active: curPage == item}">{{item}}</b>
              <b v-show="curPage < totalPage - 3" @click="pageCount(-4)" class="double-arrow">
                <i>&#x2022;&#x2022;&#x2022;</i>
                <i>&#xf3d3;&#xf3d3;</i>
              </b>
              <b v-show="totalPage > 1" @click="pageCount(totalPage)" :class="{active: curPage == totalPage}">{{totalPage}}</b>
              <b @click="pageCount(-3)" :class="{'not-up-down': curPage > totalPage - 1}">&#xf3d3;</b>
            </div>
          </div>
          <div class="article-about">
            <div class="article-about-item">
              <h3>热门标签</h3>
              <ul class="article-hot-label">
                <li v-for="item,index in ['javascript', 'java', 'php', 'node', 'html',   'javascript', 'java', 'php', 'node', 'html','javascript', 'java', 'php', 'node', 'html','javascript', 'java', 'php', 'node', 'html','javascript', 'java', 'php', 'node', 'html']"
                    :class="{active: curLabel === index}"
                    @click="curLabel = index">{{item}}</li>
              </ul>
            </div>
            <div class="article-about-item">
              <h3>最新文章</h3>
              <ul class="new-article">
                <li v-for="index in 8"><b>{{index}}. </b><a href="#">重新解读常见的排序算法</a></li>
              </ul>
            </div>
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
                  Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。
                </div>
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
      curNav: 1,  // 当前对应导航
      curArticle: 0,
      curLabel: -1,  // 当前选中标签
      curPage: 1,  // 当前页数
      pageArr: [],  // 中间显示
      totalItem: 1000,  // 总条数
      totalPage: 1,  // 总页数
    };
  },
  watch: {
    curPage(newValue) {
      window.console.log(newValue);
    },
  },
  created() {
    this.totalPage = Math.ceil(this.totalItem / 15);
    if (this.totalPage > 3) {
      this.pageArr = [2, 3];
    } else if (this.totalPage > 2) {
      this.pageArr = [2];
    }
  },
  methods: {
    checkoutNav(index) {
      this.curNav = index;
      if (index === 1) {
        this.$router.push({ path: '/' });
      } else if (index === 2) {
        this.$router.push({ path: '/Travel' });
      } else if (index === 4) {
        this.$router.push({ path: '/AboutMe' });
      }
    },
    /**
     * 分页处理
     *
     * @param {number} f
     * -1: up
     * -2: fiveUp
     * -3: down
     * -4: fiveDown
     * > 0: 直接点击数字
     */
    pageCount(f) {
      if ((f === -1 && this.curPage < 2) || (f === -3 && this.curPage > this.totalPage - 1)) {
        return;
      }

      let c = f;
      switch (f) {
        case -1: c = this.curPage - 1; break;
        case -3: c = this.curPage + 1; break;
        case -2:
          c = this.curPage - 5;
          while (c < 1) {
            c += 1;
          }
          break;
        case -4:
          c = this.curPage + 5;
          while (c > this.totalPage - 1) {
            c -= 1;
          }
          break;
        default:
          if (f <= 0) {
            return;
          }
      }

      const arr = [];

      if (c > 1 && c < this.totalPage) {
        arr.push(c);
      }
      if (c > 2) {
        arr.unshift(c - 1);
      }
      if (c > 3) {
        arr.unshift(c - 2);
      }
      if (c < this.totalPage - 1) {
        arr.push(c + 1);
      }
      if (c < this.totalPage - 2) {
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
    background: rgba(49, 148, 255, 0.04);
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

                i {
                  margin-right: 6px;
                  font-size: 16px;
                  font-family: fontIcons;

                  &.icons-time {
                    color: #2a96bb;
                  }
                  &.icons-me {
                    color: #248ef1;
                  }
                }
                em {
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
                  margin-left: 10px;

                  i {
                    margin-right: 6px;
                    font-family: fontIcons;
                  }
                  em {
                    font-size: 12px;
                  }
                  &.span-dz {
                    cursor: pointer;

                    &:hover {
                      color: #0fa9d2;
                    }
                    .active {
                      color: #0fa9d2;
                    }
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
          .article-hot-label {
            font-size: 0;
            li {
              display: inline-block;
              margin: 3px;
              padding: 2px 8px;
              font-size: 12px;
              border: 1px solid #ccc;
              border-radius: 100px;
              cursor: pointer;
              user-select: none;

              &:hover {
                color: #2d8cf0;
                border-color: #2d8cf0;
              }
              &.active {
                color: #fff;
                background: #2d8cf0;
              }
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
  margin: 20px 0;
  font-family: Arial;
  overflow: hidden;
  em {
    float: left;
    margin-right: 12px;
    line-height: 32px;
    font-family: fontIcons;
  }
  b {
    box-sizing: content-box;
    float: left;
    width: 30px;
    height: 30px;
    margin-left: 8px;
    line-height: 30px;
    font-family: fontIcons;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #dddee1;
    background: #fff;
    cursor: pointer;
    user-select: none;

    &:nth-of-type(1) {
      margin-left: 0;
    }
    &:hover {
      color: #2d8cf0;
      border-color: #2d8cf0;
    }

    i {
      display: block;
      width: 100%;
      height: 100%;
      font-style: normal;
      font-weight: 100;
      font-family: fontIcons;
      text-align: center;
    }
    &.double-arrow {
      i {
        display: none;
        &:nth-of-type(1) {
          display: block;
          color: #ccc;
          font-size: 12px;
        }
      }
      &:hover {
        border-color: #dddee1;
        i {
          display: block;
          &:nth-of-type(1) {
            display: none;
          }
        }
      }
    }

    &.not-up-down {
      color: #ccc;
      border-color: #dddee1;
      cursor: not-allowed;
    }
    &.active {
      color: #fff;
      background: #2d8cf0;
      border-color: #2d8cf0;
    }
  }
}

@keyframes navmove
{
  from {height:30px;}
  to {height:70px;}
}
</style>
