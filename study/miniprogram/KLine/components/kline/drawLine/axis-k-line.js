/**
 * 绘制k线图坐标
 * @class Axis
 * @author txj
*/
const onePixelLine = require('./onePixelLine');
const optData = require('../optData');

class Axis {
    constructor(ctx, maxVal, minVal, height) {
        this.ctx = ctx;
        this.width = optData.gw;
        this.height = height;

        // 比最小值小一些
        let tmp = (minVal * 100 >> 0) % 100 < 50 ? 0 : 0.5;
        this.minVal = (minVal >> 0) + tmp;

        let gapNum = 4;
        let gap = Math.ceil((maxVal - this.minVal) / gapNum);
        if (gap > 3) {
            gapNum = 5;
            gap = Math.ceil((maxVal - this.minVal) / gapNum);
            if (gap > 5) {
                gap += 5 - (gap % 5 === 0 ? 5 : gap % 5);
            }
        }
        this.gap = gap;
        this.gapNum = gapNum;
        this.maxVal = this.minVal + gap * gapNum;

        this.init();
    }
    init() {
        const ctx = this.ctx;
        // 清屏
        ctx.clearRect(0, 0, this.width, this.height);

        // 方框
        onePixelLine(ctx, 1, 1, this.width - 1, 1);
        onePixelLine(ctx, this.width - 1, 1, this.width - 1, this.height - 1);
        onePixelLine(ctx, this.width - 1, this.height - 1, 1, this.height - 1);
        onePixelLine(ctx, 1, this.height - 1, 1, 1);

        // 坐标横线 及 文字
        const splitLen = this.height / this.gapNum;
        Array(this.gapNum + 1).fill(1).forEach((_, index) => {
            if (!index) {
                this.yAxisLabel(ctx, this.maxVal, 3, 1, 'top');
            } else if (index < this.gapNum) {
                onePixelLine(ctx, 1, splitLen * index, this.width - 1, splitLen * index);
                this.yAxisLabel(ctx, this.maxVal - this.gap * index, 3, 1 + splitLen * index);
            } else {
                this.yAxisLabel(ctx, this.maxVal - this.gap * index, 3, -1 + splitLen * index);
            }
        });
    }
    yAxisLabel(ctx, text, x, y, verticalAlign = 'bottom', align = 'left') {
        ctx.setFillStyle(optData.colors.generalChar);
        ctx.setFontSize(10);
        ctx.setTextAlign(align);
        ctx.setTextBaseline(verticalAlign);
        ctx.fillText(text, x, y);
    }
    numToYaxis(num) {
        (num < this.minVal) && (num = this.minVal);
        (num > this.maxVal) && (num = this.maxVal);
        return (this.maxVal - num) * this.height / (this.maxVal - this.minVal);
    }
}

module.exports = Axis;