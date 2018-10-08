/**
 * 绘制k线图
 * @class Axis
 * @author txj
*/
const AxisKLine = require('./axis-k-line');
const onePixelLine = require('./onePixelLine');
const optData = require('../optData');

class KLine {
    /**
     * k线图
     * @param ctx   画笔
     * @param data   数据
     * @param overShowDataLen   超出显示的数组长度
     * @param height   图像容器高度
     * @param maxVal   数据最大值
     * @param minVal   数据最小值
     */
    constructor(ctx, data, overShowDataLen, height, maxVal, minVal) {
        // 蜡烛图 数据
        this.data = data;
        // 5日均线 数据
        this.MA5Data = [];
        // 10日均线 数据
        this.MA10Data = [];
        // 20日均线 数据
        this.MA20Data = [];
        // 30日均线 数据
        this.MA30Data = [];

        this.ctx = ctx;
        this.axis = new AxisKLine(ctx, maxVal, minVal, height);
        // ma10 临时和
        let lastMa10Sum;
        // ma20 临时和
        let lastMa20Sum;
        // ma30 临时和
        let lastMa30Sum;
        for (let i = this.data.length - 1; i > -1; i--) {
            // 蜡烛图 处理
            let candleIndex = i - overShowDataLen;
            if (candleIndex > -1 && !this.data[i].invalide) {
                this.candle(this.data[i], candleIndex);
            }

            // MA5 计算, 5日收盘价的平均
            let index = i - 4;
            if (index > -1 && !this.data[i].invalide) {
                // 值为 5 个, 可直接枚举
                this.MA5Data.push({
                    candleIndex,
                    date: this.data[i].date,
                    val: (this.data[i - 4].close + this.data[i - 3].close + this.data[i - 2].close + this.data[i - 1].close + this.data[i].close) / 5
                });
            }

            // MA10 计算, 10日收盘价的平均
            index = i - 9;
            if (index > -1 && !this.data[i].invalide) {
                if (lastMa10Sum == null) {
                    lastMa10Sum = 0;
                    Array(10).fill(1).forEach((_, ind) => {
                        lastMa10Sum += this.data[i - ind].close;
                    });
                } else {
                    lastMa10Sum += this.data[i - 9].close - this.data[i - 1].close;
                }
                this.MA10Data.push({
                    candleIndex,
                    date: this.data[i].date,
                    val: lastMa10Sum / 10
                });
            }
            // MA20 计算, 20日收盘价的平均
            index = i - 19;
            if (index > -1 && !this.data[i].invalide) {
                if (lastMa20Sum == null) {
                    lastMa20Sum = 0;
                    Array(20).fill(1).forEach((_, ind) => {
                        lastMa20Sum += this.data[i - ind].close;
                    });
                } else {
                    lastMa20Sum += this.data[i - 19].close - this.data[i - 1].close;
                }
                this.MA20Data.push({
                    candleIndex,
                    date: this.data[i].date,
                    val: lastMa20Sum / 20
                });
            }
            // MA30 计算, 30日收盘价的平均
            index = i - 29;
            if (index > -1 && !this.data[i].invalide) {
                if (lastMa30Sum == null) {
                    lastMa30Sum = 0;
                    Array(30).fill(1).forEach((_, ind) => {
                        lastMa30Sum += this.data[i - ind].close;
                    });
                } else {
                    lastMa30Sum += this.data[i - 29].close - this.data[i - 1].close;
                }
                this.MA30Data.push({
                    candleIndex,
                    date: this.data[i].date,
                    val: lastMa30Sum / 30
                });
            }

        }
        this.drawMA5();
        this.drawMA10();
        this.drawMA20();
        this.drawMA30();
    }
    numToYaxis(num) {
        return this.axis.numToYaxis(num);
    }
    // 画蜡烛图
    candle({ date, open, close, high, low }, index) {
        const ctx = this.ctx;
        // 开盘价 < 收盘价, 显示红色, 十字线,也显示 红色
        let color = optData.colors.redK;
        // 开盘价 > 收盘价, 显示绿色
        if (open > close) {
            color = optData.colors.greenK;
        }

        // 价格 转化为 当前坐标系高度
        open = this.axis.numToYaxis(open);
        close = this.axis.numToYaxis(close);
        high = this.axis.numToYaxis(high);
        low = this.axis.numToYaxis(low);

        // 横坐标位置
        const Xaxis = optData.mw + optData.bw * (index + 1);
        // 绘制 最高点 -> 最低点
        onePixelLine(ctx, Xaxis, high, Xaxis, low, color);

        // 绘制开盘收盘价
        onePixelLine(ctx, Xaxis, open, Xaxis, close, color, optData.bw * 0.7);
    }
    // 5日均线
    drawMA5() {
        this.drawMA(this.MA5Data, optData.colors.MA5);
    }
    // 10日均线
    drawMA10() {
        this.drawMA(this.MA10Data, optData.colors.MA10);
    }
    // 20日均线
    drawMA20() {
        this.drawMA(this.MA20Data, optData.colors.MA20);
    }
    // 30日均线
    drawMA30() {
        this.drawMA(this.MA30Data, optData.colors.MA30);
    }
    // 均线
    drawMA(maData, color) {
        if (maData.length < 2) {
            return;
        }
        // 最右边 的 第一个 均线 点
        let lastXaxis = optData.mw + optData.bw * (maData[0].candleIndex + 1);
        let lastYaxis = this.axis.numToYaxis(maData[0].val);
        for (let i = 1; i < maData.length; i++) {
            // 横坐标位置
            let curXaxis = optData.mw + optData.bw * (maData[i].candleIndex + 1);
            let curYaxis = this.axis.numToYaxis(maData[i].val);
            onePixelLine(this.ctx, lastXaxis, lastYaxis, curXaxis, curYaxis, color);
            lastXaxis = curXaxis;
            lastYaxis = curYaxis;
        }
    }
}

module.exports = KLine;