//index.js
//获取应用实例
const app = getApp()

const angle = [0, 51.42, 102.84, 154.26, 205.68, 257.1, 308.52];
let clickCnt = 1;

Page({
  data: {
    // 推荐者,id 列表[第一推荐人, 第二推荐人, 第三推荐人]
    presenters: [],
    arrowAnimation: {},
    imgList: [
      {
        key: 0,
        // 概率
        rate: [0, 20],   // 20%
        rotate: -90 + angle[0],
        src: '../../images/hb.jpg',
        text: '5个指数坊'
      }, {
        key: 1,
        rate: [20, 70],   // 50%
        rotate: -90 + angle[1],
        // 没有图片,就没有src属性
        text: '谢谢参与'
      }, {
        key: 2,
        rate: [70, 82],   // 12%
        rotate: -90 + angle[2],
        src: '../../images/hb.jpg',
        text: '10个指数坊'
      }, {
        key: 3,
        rate: [82, 90],   // 8%
        rotate: -90 + angle[3],
        src: '../../images/hb.jpg',
        text: '20个指数坊'
      }, {
        key: 4,
        rate: [90, 94],   // 4%
        rotate: -90 + angle[4],
        src: '../../images/hb.jpg',
        text: '50个指数坊'
      }, {
        key: 5,
        rate: [94, 97],   // 3%
        rotate: -90 + angle[5],
        src: '../../images/ys.png',
        text: '后悔药'
      }, {
        key: 6,
        rate: [97, 100],   // 3%
        rotate: -90 + angle[6],
        src: '../../images/kp.png',
        text: '负分清零卡'
      }
    ]
  },
  onLoad: function (options) {
    if (options.presenters) {
      this.data.presenters = [...JSON.parse(options.presenters)];
      wx.showModal({
        title: '提示',
        content: `推荐者:\n${JSON.stringify(this.data.presenters, null, 4)}`,
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      });
    }
  },
  // 转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    const presenters = [app.globalData.openid, ...this.data.presenters];
    return {
      title: '自定义转发标题',
      path: `/pages/index/index?presenters=${JSON.stringify(presenters)}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 抽奖
  drawAward(e) {
    if (!this.checkHasLotto()) {
      wx.showModal({
        title: '提示',
        content: '每日只能抽奖一次!',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      });
      return;
    }
    let w = 0;
    const randNum = Math.floor(Math.random() * 100);
    this.data.imgList.forEach(item => {
      if (randNum >= item.rate[0] && randNum < item.rate[1]) {
        w = item.key;
      }
    });
    const animation = wx.createAnimation({
      transformOrigin: "-80rpx 50%",
      duration: 6000,
      timingFunction: "ease",
      delay: 0
    });
    animation.rotate(360 * 20 * clickCnt + angle[w]).step();
    clickCnt++;
    this.setData({
      arrowAnimation: animation.export()
    });
    // 成功提示
    setTimeout(() => {
      let ts = `恭喜你抽中 ${this.data.imgList[w].text}!`;
      if (w === 1) {
        ts = this.data.imgList[w].text;
      }
      wx.showModal({
        title: '提示',
        content: ts,
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      });
    }, 6500);
  },
  checkHasLotto() {
    const hasLotto = wx.getStorageSync('hasLotto');
    const now = new Date();
    const todayMillisec = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    if (!hasLotto || hasLotto < todayMillisec) {
      wx.setStorageSync('hasLotto', todayMillisec);
      return true;
    } else {
      return false;
    }
  }
})
