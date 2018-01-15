<template>
  <div class="date-com">
    <div class="panel-body">
        <div class="picker-header">
            <span class="icon-btn icon-btn-left">
              <img class="img-btn" src="../assets/images/double_arrow.png">
              <img class="img-btn" src="../assets/images/double_arrow_blue.png">
            </span>
            <span class="icon-btn icon-btn-double-left">
              <img class="img-btn" src="../assets/images/arrow.png">
              <img class="img-btn" src="../assets/images/arrow_blue.png">
            </span>
            <span>2016年</span>
            <span>1 月</span>
            <span class="icon-btn icon-btn-double-right">
              <img class="img-btn" src="../assets/images/double_arrow.png">
              <img class="img-btn" src="../assets/images/double_arrow_blue.png">
            </span>
            <span class="icon-btn icon-btn-right">
              <img class="img-btn" src="../assets/images/arrow.png">
              <img class="img-btn" src="../assets/images/arrow_blue.png">
            </span>
        </div>
        <div>
            <div class="picker-cells" style="display: none;">
              <div class="cells-header">
                <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
              </div>
              <span v-for="item in [27, 28, 29, 30, 31]" class="picker-cells-cell"><em>{{item}}</em></span><span v-for="item in 31" class="picker-cells-cell"><em>{{item}}</em></span><span v-for="item in 6" class="picker-cells-cell"><em>{{item}}</em></span>
            </div>
            <div class="picker-cells picker-cells-year" style="display: none;">
              <span class="picker-cells-cell" v-for="item in 10"><em>{{item + 2009}}</em></span>
            </div>
            <div class="picker-cells picker-cells-month">
              <span class="picker-cells-cell" v-for="item in 12"><em>{{item}}月</em></span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// <img class="img-btn" src="../assets/images/arrow.png">
export default {
  name: 'DateCom',
  data () {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
body {margin:0;padding:20px 60px;}
.date-com {
}
* {margin:0;padding:0;box-sizing:border-box;}
body {font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    font-size: 12px;}
.icon-btn {
    float: left;
    display: inline-block;
    width: 20px;
    height: 24px;
    line-height: 26px;
    margin-top: 4px;
    text-align: center;
    cursor: pointer;
    color: #c3cbd6;
    transition: color .2s ease-in-out;
    .img-btn {
      display: inline-block;
      width: 12px;
      height: 12px;
      &:nth-of-type(2) {
        display: none;
      }
    }
    &:hover {
      .img-btn {
        display: none;
        &:nth-of-type(2) {
          display: inline-block;
        }
      }
    }
    &.icon-btn-left {
      margin-left: 10px;
      transform: scaleX(-1);
    }
    &.icon-btn-double-left {
      transform: scaleX(-1);
    }
    &.icon-btn-double-right {
      float: right;
      margin-right: 10px;
    }
    &.icon-btn-right {
      float: right;
    }
}
.panel-body {
    float: left;
    width: 216px;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
}
.picker-header {
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-bottom: 1px solid #e3e8ee;
}

.cells-header {
    span {
      line-height: 24px;
      text-align: center;
      margin: 2px;
      color: #c3cbd6;
    }
}
.picker-cells {
    width: 196px;
    margin: 10px;
    line-height: normal;
    span {
      display: inline-block;
      width: 24px;
      height: 24px;
      em {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        margin: 2px;
        font-style: normal;
        border-radius: 3px;
        text-align: center;
        transition: all .2s ease-in-out;
      }
    }
}

span.picker-cells-cell {
    width: 28px;
    height: 28px;
    cursor: pointer;
}
.picker-cells-month, .picker-cells-year {
    margin-top: 14px;
    span {
      width: 40px;
      height: 28px;
      line-height: 28px;
      margin: 10px 12px;
      border-radius: 3px;
      em {
        width: 40px;
        height: 28px;
        line-height: 28px;
        margin: 0;
      }
    }
}
</style>
