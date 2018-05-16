//app.js
App({
    onLaunch: function () {
        wx.getSystemInfo({
            success: res => {
                this.globalData.hairlineWidth = 1 / res.pixelRatio;
                this.globalData.sw = res.screenWidth;
                // 图表宽度
                this.globalData.gw = (740 / 750) * this.globalData.sw;
                this.globalData.bn = Math.floor(this.globalData.gw / this.globalData.bw) - 1;
                this.globalData.mw = (this.globalData.gw - this.globalData.bw * this.globalData.bn) / 2;
            }
        });
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    // wx.getUserInfo({
                    //   success: res => {
                    //     // 可以将 res 发送给后台解码出 unionId
                    //     this.globalData.userInfo = res.userInfo

                    //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    //     // 所以此处加入 callback 以防止这种情况
                    //     if (this.userInfoReadyCallback) {
                    //       this.userInfoReadyCallback(res)
                    //     }
                    //   }
                    // })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        // 最细线宽度,
        hairlineWidth: 1,
        // 屏幕宽度, screenWidth
        sw: 750,
        // 图表宽度, graphWidth
        gw: 740,
        // 图像距离边界宽度, marginWidth
        mw: 0,
        // 图表一格的长度, barWidth
        bw: 6.5,
        // 图表格数, barNum
        bn: 56,
        colors: {
            // 背景色
            bg: "#ffffff",
            // 一般字体颜色
            generalChar: "#8f8f8f",
            // 十字线颜色
            crosshair: "#747474",
            // 十字线对应 时间 颜色
            crosshairDate: "#dd782a",
            axis: "#e5e5e5",
            // 红色k线
            redK: "#dd2604",
            // 绿色k线
            greenK: "#2ea912",
            MA5: "#6c91e2",
            MA10: "#daa273",
            MA20: "#cb90a4",
            MA30: "#52bf40",
            DIFF: "#6d8fe8",
            DEA: "#cfa37c",
        }
    }
})
