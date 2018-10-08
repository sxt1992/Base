const commonData = {
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
};

wx.getSystemInfo({
    success: res => {
        commonData.hairlineWidth = 1 / res.pixelRatio;
        commonData.sw = res.screenWidth;
        // 图表宽度
        commonData.gw = (740 / 750) * commonData.sw;
        commonData.bn = Math.floor(commonData.gw / commonData.bw) - 1;
        commonData.mw = (commonData.gw - commonData.bw * commonData.bn) / 2;
    }
});

module.exports = commonData;