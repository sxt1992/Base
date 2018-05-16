/**
 * 绘制k线图
 * @class Axis
 * @author txj
*/
const AxisKMacd = require('./axis-k-macd');
const onePixelLine = require('./onePixelLine');
const globalData = getApp().globalData;

/**

计算公式:

EMA（12）= 前一日EMA（12）×11/13＋今日收盘价×2/13
EMA（26）= 前一日EMA（26）×25/27＋今日收盘价×2/27
DIFF=今日EMA（12）- 今日EMA（26）
DEA（MACD）= 前一日DEA×8/10＋今日DIF×2/10
MACD（BAR）=2×(DIFF－DEA)

新股上市第一天:
  DIFF=0, DEA=0, MACD=0，收盘价55.01，EMA（12）= 55.01（收盘价），EMA（26）= 55.01（收盘价）

保留三位有效数字
*/
class KMacd {
    /**
     * macd 图
     * @param ctx   画笔
     * @param data   数据
     * @param overShowDataLen   超出显示的数组长度
     * @param height   图像容器高度
     * @param maxVal   数据最大值
     * @param minVal   数据最小值
     */
    constructor(ctx, data, overShowDataLen, height, maxVal, minVal) {
        // 柱状图 数据
        this.data = data;
        // DIFF 数据
        this.DIFFData = [];
        // DEA 数据
        this.DEAData = [];

        this.ctx = ctx;
        this.axis = new AxisKMacd(ctx, maxVal, minVal, height);

        for (let i = this.data.length - 1; i > -1; i--) {
            // macd图 处理
            let macdIndex = i - overShowDataLen;
            if (macdIndex > -1 && !this.data[i].invalide) {
                this.macd(this.data[i].MACD, macdIndex);
                this.DIFFData.push({
                    macdIndex,
                    date: this.data[i].date,
                    val: this.data[i].DIFF,
                });
                // DEA 数据
                this.DEAData.push({
                    macdIndex,
                    date: this.data[i].date,
                    val: this.data[i].DEA,
                });
            }
        }
        this.drawDIFF();
        this.drawDEA();
    }
    // 画macd图
    macd(val, index) {
        if (val == 0) {
            return;
        }
        // 横坐标位置
        const Xaxis = globalData.mw + globalData.bw * (index + 1);
        // macd > 0, 显示红色
        let color = globalData.colors.redK;
        // macd < 0, 显示绿色
        if (val < 0) {
            color = globalData.colors.greenK;
        }

        // 绘制 macd
        this.axis.numLineToZero(val, Xaxis, color);
    }
    // 5日均线
    drawDIFF() {
        this.drawCurveLine(this.DIFFData, globalData.colors.DIFF);
    }
    // 30日均线
    drawDEA() {
        this.drawCurveLine(this.DEAData, globalData.colors.DEA);
    }
    // 均线
    drawCurveLine(maData, color) {
        if (maData.length < 2) {
            return;
        }
        // 最右边 的 第一个 均线 点
        let lastXaxis = globalData.mw + globalData.bw * (maData[0].macdIndex + 1);
        let lastYaxis = this.axis.numToYaxis(maData[0].val);
        for (let i = 1; i < maData.length; i++) {
            // 横坐标位置
            let curXaxis = globalData.mw + globalData.bw * (maData[i].macdIndex + 1);
            let curYaxis = this.axis.numToYaxis(maData[i].val);
            onePixelLine(this.ctx, lastXaxis, lastYaxis, curXaxis, curYaxis, color);
            lastXaxis = curXaxis;
            lastYaxis = curYaxis;
        }
    }
}

module.exports = KMacd;