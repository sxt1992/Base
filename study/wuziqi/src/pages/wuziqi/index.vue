<template>
  <div class="wuziqi">
    <h1>五子棋</h1>
    <div class="chessboard">
      <div class="board">
        <ul class="horizontal-line">
          <li v-for="index in 15">
            <b>{{index}}</b>
          </li>
        </ul>
        <ul class="vertical-line">
          <li v-for="index in 15">
            <b>{{String.fromCharCode(index + 64)}}</b>
          </li>
        </ul>
      </div>
      <div class="chess">
        <template v-for="rowData,row in matrix">
          <i v-for="data,col in rowData" :class="{'white-chess': data===1, 'black-chess': data===2}" :style="{top: row*25 + 13 + 'px', left: col*25 + 13 + 'px'}" @click="playChess(row, col, data)">
              <template v-if="data===0">
                <b class="up-left"></b>
                <b class="up-right"></b>
                <b class="down-left"></b>
                <b class="down-right"></b>
              </template>
          </i>
        </template>
      </div>
    </div>
    <div class="scores-panel">
      <h2>正在操作 {{AIplay ? '白棋' : '黑棋'}}</h2>
      <i :class="{'active-white-chess': AIplay, 'active-black-chess': !AIplay}"></i>
    </div>
    <div class="operate"></div>
    <div class="gray-bg" v-show="AIplay">
      <div class="bg-cont">
        <div class="ai-playing"><i></i><i></i><i></i><i></i><i></i></div>
        <b>AI 正在思考... </b>
      </div>
    </div>
  </div>
</template>

<script>
import comput from './AI.js';
import checkChess from './checker.js';

// AI 为 1
const initMatrix = JSON.stringify([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);
const initScores = (() => {
  const scores = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      scores.push({
        r: i,
        c: j,
        s: 0,
      });
    }
  }
  return JSON.stringify(scores);
})();

export default {
  name: 'wuziqi',
  data() {
    return {
      matrix: JSON.parse(initMatrix),
      AIplay: false,
      scores: JSON.parse(initScores),
    };
  },
  methods: {
    playChess(r, c, data) {
      if (this.AIplay || data !== 0) {
        return;
      }
      this.matrix[r][c] = 2;
      if (checkChess(this.matrix, r, c, 2)) {
        window.alert('你赢了!');
        return;
      }
      comput(this.matrix, this.scores, r, c);
      this.AIplay = true;
      new Promise(res => res()).then(() => {
        const res = comput(this.matrix, this.scores, r, c);
        if (res[2] >= 100000) {
          window.alert('你输了!');
          return;
        }
        this.matrix[res[0]][res[1]] = 1;
        this.AIplay = false;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wuziqi {
  .chessboard{
    position: relative;
    width: 400px;
    height: 400px;

    .board {
      position: relative;
      width: 100%;
      height: 100%;
      font-size: 12px;
      background: #d2b295;

      ul {
        width: 400px;
        height: 400px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .horizontal-line{
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 25px;
        padding-left: 24px;

        li {
          width: 100%;
          height: 25px;
          line-height: 50px;
          border-bottom: 1px solid #563f27;

          b {
            position: relative;
            right: 19px;
            font-weight: normal;
          }
        }
      }
      .vertical-line{
        position: absolute;
        top:0;
        left: 0;
        padding: 25px 0;

        li {
          float: left;
          width: 25px;
          height: 100%;
          border-right: 1px solid #563f27;

          b {
            position: relative;
            left: 20px;
            bottom: 20px;
            font-weight: normal;
          }
        }
      }
    }

    .chess {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      i {
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50px;
        cursor: pointer;

        b {
          float: left;
          width: 6px;
          height: 6px;
          border: 2px solid transparent;

          &.up-left {
            border-right: none;
            border-bottom: none;
          }
          &.up-right {
            margin-left: 10px;

            border-left: none;
            border-bottom: none;
          }
          &.down-left {
            margin-top: 10px;

            border-top: none;
            border-right: none;
          }
          &.down-right {
            margin-top: 10px;
            margin-left: 10px;

            border-left: none;
            border-top: none;
          }
        }

        &:hover {
          b {
            border-color: #f00;
          }
        }
        &.white-chess {
          cursor: default;
          box-shadow: 1px 1px 1px rgba(0,0,0,.5), -1px -1px 1px rgba(0,0,0,.5);
          background: linear-gradient(135deg, #000 -70%, #fff 80%);

          b {
            border-color: transparent;
          }
        }
        &.black-chess {
          cursor: default;
          box-shadow: 1px 1px 1px rgba(0,0,0,.5), -1px -1px 1px rgba(0,0,0,.5);
          background: linear-gradient(135deg, #fff -70%, #000 80%);

          b {
            border-color: transparent;
          }
        }
      }
    }
  }
  .scores-panel {
    h2 {
      margin: 0;
      padding: 0;
      font-weight: normal;
      font-size: 14px;
    }
    i {
      display: block;
      width: 22px;
      height: 22px;
      border-radius: 50px;

      &.active-white-chess {
        box-shadow: 1px 1px 1px rgba(0,0,0,.5), -1px -1px 1px rgba(0,0,0,.5);
        background: linear-gradient(135deg, #000 -70%, #fff 80%);
      }
      &.active-black-chess {
        box-shadow: 1px 1px 1px rgba(0,0,0,.5), -1px -1px 1px rgba(0,0,0,.5);
        background: linear-gradient(135deg, #fff -70%, #000 80%);
      }
    }
  }
  .gray-bg {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    .bg-cont {
      .ai-playing {
        display: flex;
        justify-content: space-around;

        i {
          width: 6px;
          height: 40px;
          background: #67cf22;
          animation: stretchdelay 1.2s ease-in-out infinite;

          &:nth-of-type(2){ animation-delay: -1.1s; }
          &:nth-of-type(3){ animation-delay: -1.0s; }
          &:nth-of-type(4){ animation-delay: -0.9s; }
          &:nth-of-type(5){ animation-delay: -0.8s; }
        }
      }
      b {
        display: block;
        color: #fff;
        font-weight: normal;
      }
    }
  }
}

@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1.0);
  }
}
</style>
