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
              <li>内容1</li>
              <li>内容2</li>
            </ul>
            <div class="pagination">
              <em>&gt;</em>
            </div>
          </div>
          <div class="article-about">fdu76fsd</div>
        </div>
      </main>
      <footer></footer>
    </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      navActive: 1, // 当前对应nav
      articleNavActive: 0,
    };
  },
};
</script>
<style scoped lang="less">
.home {
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
        width: 800px;
        background: red;
      }
      .article-about {
        float: right;
        width: 360px;
        background: blue;
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
