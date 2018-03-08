<template>
    <div class="travel">
      <header>
        <nav>
          <span>木兮的网站</span>
          <ul class="nav-title">
            <li v-for="item,index in ['首 页','文 章','游 迹','留 言','关 于']"
                @click="curNav = index"
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
      </main>
    </div>
</template>
<script>

export default {
  name: 'travel',
  data() {
    return {
    };
  },
  mounted() {
  },
  updated() {
  },
  methods: {
  },
};
</script>
<style lang="less">
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
}
</style>
