/**
 * 绘制k线图
 * @class Axis
 * @author txj
*/
const AxisKTurnover = require('./axis-k-turnover');
const onePixelLine = require('./onePixelLine');
const optData = require('../optData');

class KTurnover {
    /**
     * 成交量 图
     * @param ctx   画笔
     * @param data   数据
     * @param overShowDataLen   超出显示的数组长度
     * @param height   图像容器高度
     * @param maxVal   数据最大值
     * @param minVal   数据最小值
     */
    constructor(ctx, data, overShowDataLen, height, maxVal) {
        // 柱状图 数据
        this.data = data;
        // 5日均线 数据
        this.MA5Data = [];
        // 10日均线 数据
        this.MA10Data = [];

        this.ctx = ctx;
        this.axis = new AxisKTurnover(ctx, maxVal, height);
        // ma10 临时和
        let lastMa10Sum;
        for (let i = this.data.length - 1; i > -1; i--) {
            // 柱状图 处理
            let histogramIndex = i - overShowDataLen;
            if (histogramIndex > -1 && !this.data[i].invalide) {
                this.histogram(this.data[i].volume, this.data[i].open < this.data[i].close, histogramIndex);
            }

            // MA5 计算, 5日收盘价的平均
            let index = i - 4;
            if (index > -1 && !this.data[i].invalide) {
                // 值为 5 个, 可直接枚举
                this.MA5Data.push({
                    histogramIndex,
                    date: this.data[i].date,
                    val: (this.data[i - 4].volume + this.data[i - 3].volume + this.data[i - 2].volume + this.data[i - 1].volume + this.data[i].volume) / 5
                });
            }

            // MA10 计算, 10日收盘价的平均
            index = i - 9;
            if (index > -1 && !this.data[i].invalide) {
                if (lastMa10Sum == null) {
                    lastMa10Sum = 0;
                    Array(10).fill(1).forEach((_, ind) => {
                        lastMa10Sum += this.data[i - ind].volume;
                    });
                } else {
                    lastMa10Sum += this.data[i - 9].volume - this.data[i - 1].volume;
                }
                this.MA10Data.push({
                    histogramIndex,
                    date: this.data[i].date,
                    val: lastMa10Sum / 10
                });
            }
        }
        this.drawMA5();
        this.drawMA10();
    }
    /**
     * 画柱状图
     * vol 成交量
     * isRedK 是否为涨,true为涨, flase为跌
     * index 为第几柱状图
     */
    histogram(vol, isRedK, index) {
        // 横坐标位置
        const Xaxis = optData.mw + optData.bw * (index + 1);
        const color = isRedK ? optData.colors.redK : optData.colors.greenK;
        this.axis.numLineToBottom(vol, Xaxis, color);
    }
    // 5日均线
    drawMA5() {
        this.drawMA(this.MA5Data, optData.colors.MA5);
    }
    // 10日均线
    drawMA10() {
        this.drawMA(this.MA10Data, optData.colors.MA10);
    }
    // 均线
    drawMA(maData, color) {
        if (maData.length < 2) {
            return;
        }
        // 最右边 的 第一个 均线 点
        let lastXaxis = optData.mw + optData.bw * (maData[0].histogramIndex + 1);
        let lastYaxis = this.axis.numToYaxis(maData[0].val);
        for (let i = 1; i < maData.length; i++) {
            // 横坐标位置
            let curXaxis = optData.mw + optData.bw * (maData[i].histogramIndex + 1);
            let curYaxis = this.axis.numToYaxis(maData[i].val);
            onePixelLine(this.ctx, lastXaxis, lastYaxis, curXaxis, curYaxis, color);
            lastXaxis = curXaxis;
            lastYaxis = curYaxis;
        }
    }
}

module.exports = KTurnover;