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
          <i
            v-for="data,col in rowData"
            @click="playChess(row, col, data)"
            :style="{top: row*0.625 + 0.3126 + 'rem', left: col*0.625 + 0.3126 + 'rem'}"
            :class="{'white-chess': data===1, 'black-chess': data===2, 'last-chess': lastChess[0] === row && lastChess[1] === col}">
              <template v-if="data === 0 || (lastChess[0] === row && lastChess[1] === col)">
                <b class="up-left"></b>
                <b class="up-right"></b>
                <b class="down-left"></b>
                <b class="down-right"></b>
              </template>
          </i>
        </template>
        <div class="show-res" v-if="AIwin != null">
          {{AIwin ? '对不起,你输了!' : '恭喜,你赢了!'}}
        </div>
      </div>
    </div>
    <div class="scores-panel">
      <h2>正在操作 {{AIplay ? '白棋' : '黑棋'}}</h2>
      <i :class="{'active-white-chess': AIplay, 'active-black-chess': !AIplay}"></i>
    </div>
    <div class="operate">
      <button @click="reGame">重新开始</button>
    </div>
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
  for (let i = 0; i < 15; i += 1) {
    for (let j = 0; j < 15; j += 1) {
      scores.push({
        r: i,
        c: j,
        s: 0,
      });
    }
  }
  return JSON.stringify(scores);
})();

let isChessChange = false; // 只有 棋局变化才执行

export default {
  name: 'wuziqi',
  data() {
    return {
      matrix: JSON.parse(initMatrix),
      AIplay: false,
      scores: JSON.parse(initScores),
      activeRC: [0, 0],
      lastChess: [-1, -1],
      AIwin: null,
      reGameIng: false, // 正在重新开始
    };
  },
  watch: {
    matrix() {
      isChessChange = true;
    },
  },
  updated() {
    // 只有 棋局变化才执行
    if (isChessChange) {
      isChessChange = false;
      if (this.reGameIng) {
        this.reGameIng = false;
        return;
      }

      if (this.AIplay) {
        this.AIplay = false;
        if (checkChess(this.matrix, this.activeRC[0], this.activeRC[1], 1)) {
          this.AIwin = true;
        }
      } else {
        if (checkChess(this.matrix, this.activeRC[0], this.activeRC[1], 2)) {
          this.AIwin = false;
          return;
        }
        this.AIplay = true;
        const res = comput(this.matrix, this.scores);
        this.lastChess = [res[0], res[1]];
        this.$set(this.matrix[res[0]], res[1], 1);
        this.removeScore(res[0], res[1]);
        this.activeRC = [res[0], res[1]];
      }
    }
  },
  methods: {
    playChess(r, c, data) {
      if (this.reGameIng || this.AIplay || data !== 0) {
        return;
      }
      this.lastChess = [r, c];
      this.$set(this.matrix[r], c, 2);
      this.removeScore(r, c);
      this.activeRC = [r, c];
    },
    removeScore(r, c) {
      let k = 0;
      const len = this.scores.length;
      while (k < len) {
        if (this.scores[k].r === r && this.scores[k].c === c) {
          this.scores.splice(k, 1);
          return;
        }
        k += 1;
      }
    },
    reGame() {
      this.reGameIng = true;
      this.AIplay = false;
      this.scores = JSON.parse(initScores);
      this.activeRC = [0, 0];
      this.lastChess = [-1, -1];
      this.AIwin = null;
      this.matrix = JSON.parse(initMatrix);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wuziqi {
  .chessboard{
    position: relative;
    width: 10rem;
    height: 10rem;

    .board {
      position: relative;
      width: 100%;
      height: 100%;
      font-size: 12px;
      background: #d2b295;

      ul {
        width: 10rem;
        height: 10rem;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .horizontal-line{
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 0.625rem;
        padding-left: 0.615rem;

        li {
          width: 100%;
          height: 0.625rem;
          line-height: 1.25rem;
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
        padding: 0.616rem 0;

        li {
          float: left;
          width: 0.625rem;
          height: 100%;
          border-right: 1px solid #563f27;

          b {
            position: relative;
            left: 0.5rem;
            bottom: 0.5rem;
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
        width: 0.56rem;
        height: 0.56rem;
        border-radius: 2rem;
        cursor: pointer;

        b {
          float: left;
          width: 0.15rem;
          height: 0.15rem;
          border: 2px solid transparent;

          &.up-left {
            border-right: none;
            border-bottom: none;
          }
          &.up-right {
            margin-left: 0.26rem;

            border-left: none;
            border-bottom: none;
          }
          &.down-left {
            margin-top: 0.26rem;

            border-top: none;
            border-right: none;
          }
          &.down-right {
            margin-top: 0.26rem;
            margin-left: 0.26rem;

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
        }
        &.black-chess {
          cursor: default;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #fff -70%, #000 80%);
        }
        &.last-chess {
          b {
            border-color: #f00;
          }
        }
      }

      .show-res {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        line-height: 10rem;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
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
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 1rem;

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
          width: 0.15rem;
          height: 1rem;
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
