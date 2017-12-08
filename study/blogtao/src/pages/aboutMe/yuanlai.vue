<template>
  <div class="aboutme">
    <div class="main">
      <div class="head">
        <img src="../../assets/images/header-background.jpg">
        <div class="head-name">我是陶雪焦</div>
        <div class="click-word"><p>显示全部</p><div>&#xf3d4;</div></div>
      </div>
    </div>
    <div class="menu">&#xf13f;</div>
  </div>
</template>
<script>

export default {
  name: 'aboutme',
  data() {
    return {
      animateClass: '',
      aa: true,
    };
  },
  methods: {
    dj() {
      if (window.animateing) {
        return;
      }
      // eslint-disable-next-line
      this.aa ? this.animate('bounceInLeft animated', {
        br: 'hidden',
      }) : this.animate('bounceOutLeft animated', {
        aa: 'hidden',
      });
      this.aa = !this.aa;
    },
    animate(c, ac = {}) {
      const { ba = '', br = '', aa = '', ar = '' } = ac;
      const sp = '*_*@split';
      // eslint-disable-next-line
      this.animateClass = `${c}do-sth-start{${ba.trim()}${sp}${br.trim()}${sp}${aa.trim()}${sp}${ar.trim()}}do-sth-end${Math.round(Math.random()*100000)}`;
    },
  },
};
</script>
<style lang="less">
.hidden {
  visibility: hidden;
}
.visible {
  visibility: visible;
}
@keyframes clickwdframe {
  0% {opacity: 1;}
  10% {opacity: 0.93;}
  20% {opacity: 0.86;}
  30% {opacity: 0.79;}
  40% {opacity: 0.72;}
  50% {opacity: 0.65;}
  60% {opacity: 0.58;}
  70% {opacity: 0.51;}
  80% {opacity: 0.44;}
  90% {opacity: 0.37;}
  100% {opacity: 0.3;}
}
</style>
<style scoped lang="less">
img {margin: 0;padding: 0;border: none;}
.aboutme {
  width: 100%;
  height: 100%;

  .main {
    width: 100%;
    height: 100%;

    .head {
      position: relative;
      width: 100%;
      height: 100%;

      &>img {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .head-name {
        position: absolute;
        top: 40%;
        width: 100%;
        color: #fff;
        font-size: 80px;
        font-family: picTypes;
        text-align: center;
      }
      .click-word {
        position: absolute;
        left: 50%;
        bottom: 10px;
        width: 120px;
        margin-left: -60px;
        padding: 2px 0;
        color: #fff;
        font-weight: bold;
        font-size: 32px;
        line-height: 100%;
        font-family: fontIcons;
        text-align: center;
        user-select: none;
        cursor: pointer;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        animation: clickwdframe 2s linear infinite alternate;

        p {
          margin: 0;
          font-weight: normal;
          font-size: 14px;
        }
      }
    }
  }
}
.menu {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  color: #ccc;
  font-size: 30px;
  line-height: 40px;
  font-family: fontIcons;
  text-align: center;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #fff;
  }
}
</style>
