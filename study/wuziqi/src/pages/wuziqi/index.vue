<template>
  <div class="wuziqi" style="display: none">
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
        <i class="board-point up-left"></i>
        <i class="board-point up-right"></i>
        <i class="board-point down-left"></i>
        <i class="board-point down-right"></i>
        <i class="board-point point-center"></i>
      </div>
      <div class="chess">
        <template v-for="rowData,row in matrix">
          <i
            v-for="data,col in rowData"
            @click="playChess(row, col, data)"
            :style="{top: isPc ? row*25 + 13 + 'px':row*0.625 + 0.3126 + 'rem', left: isPc ? col*25 + 13 + 'px':col*0.625 + 0.3126 + 'rem'}"
            :class="{'white-chess': data===1, 'black-chess': data===2, 'last-chess': lastChess[0] === row && lastChess[1] === col}">
              <template v-if="data === 0 || (lastChess[0] === row && lastChess[1] === col)">
                <b class="up-left"></b>
                <b class="up-right"></b>
                <b class="down-left"></b>
                <b class="down-right"></b>
              </template>
          </i>
        </template>
        <div class="show-res" v-if="showWin != null">
          {{showWin}}
        </div>
      </div>
    </div>
    <div class="scores-panel">
      <p class="scores-panel-word"><b>难度:</b><i>{{['', '一', '二' ,'三', '四' ,'五'][level]}}</i></p>
      <p class="scores-panel-chess"><b>棋子:</b><i :class="{'active-white-chess': whichChess === 1, 'active-black-chess': whichChess === 2}"></i></p>
      <p class="scores-panel-chess"><b>操作:</b><i :class="{'active-white-chess': nowChessShow, 'active-black-chess': !nowChessShow}"></i></p>
    </div>
    <div class="operate">
      <b :class="{disabled: gameIng}">
        {{ whichChess === 2 ? '先手' : '后手'}}
        <select v-model="whichChess" :disabled="gameIng">
          <option :value="1">白棋</option>
          <option :value="2">黑棋</option>
        </select>
      </b>
      <b :class="{disabled: gameIng}">
        难度
        <select v-model="level" :disabled="gameIng">
          <option :value="1">一</option>
          <option :value="2">二</option>
          <option :value="3">三</option>
          <option :value="4">四</option>
          <option :value="5">五</option>
        </select>
      </b>
      <b @click="reGame">重来</b>
      <b @click="lastStep" :class="{disabled: showWin != null || !gameIng}">悔棋</b>
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

const isPc = (() => {
  const uA = navigator.userAgent.toLowerCase();
  const Agents = ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod'];
  for (let v = 0; v < Agents.length; v += 1) {
    if (uA.indexOf(Agents[v]) > 0) {
      return false;
    }
  }
  return true;
})();
// eslint-disable-next-line
require.ensure([], require => require(`./${isPc ? 'pc' : 'mobile'}.less`));

// AI 为 1
const initMatrix = (r, c, data) => {
  const m = [
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
  ];
  if (r != null && c != null) {
    m[r][c] = data != null ? data : 1;
  }
  return m;
};
const initScores = (r, c) => {
  const scores = [];
  for (let i = 0; i < 15; i += 1) {
    for (let j = 0; j < 15; j += 1) {
      if (i !== r && j !== c) {
        scores.push({
          r: i,
          c: j,
          s: 0,
        });
      }
    }
  }
  return scores;
};

let isChessChange = false; // 只有 棋局变化才执行

let scores = initScores();
let steps = [];
let reStep = false;

export default {
  name: 'wuziqi',
  data() {
    return {
      isPc, // 是否是pc登录
      matrix: initMatrix(),
      AIplay: false,
      activeRC: [0, 0],
      lastChess: [-1, -1],
      showWin: null,
      reGameIng: false, // 正在重新开始
      level: 1, // 难度
      whichChess: 2, // 用户是什么棋
      gameIng: false, // 正在进行中
    };
  },
  watch: {
    matrix() {
      isChessChange = !reStep;
      reStep = false;
    },
    whichChess() {
      this.reGame();
    },
    level() {
      this.reGame();
    },
  },
  mounted() {
    window.t = this;
  },
  updated() {
    // 只有 棋局变化才执行
    if (isChessChange) {
      isChessChange = false;
      if (this.reGameIng) {
        this.reGameIng = false;
        return;
      }

      const AIChess = this.whichChess === 2 ? 1 : 2;
      if (this.AIplay) {
        this.AIplay = false;
        if (checkChess(this.matrix, this.activeRC[0], this.activeRC[1], AIChess)) {
          this.showWin = '对不起,你输了!';
        }
      } else {
        if (checkChess(this.matrix, this.activeRC[0], this.activeRC[1], this.whichChess)) {
          this.showWin = '恭喜,你赢了!';
          return;
        }
        this.AIplay = true;
        const res = comput(this.matrix, scores, AIChess);
        this.lastChess = [res[0], res[1]];
        steps.push([res[0], res[1], AIChess]);
        this.$set(this.matrix[res[0]], res[1], AIChess);
        this.removeScore(res[0], res[1]);
        this.activeRC = [res[0], res[1]];
      }
    }
  },
  methods: {
    playChess(r, c, data) {
      this.gameIng = true;
      if (this.reGameIng || this.AIplay || data !== 0) {
        return;
      }
      this.lastChess = [r, c];
      steps.push([r, c, this.whichChess]);
      this.$set(this.matrix[r], c, this.whichChess);
      this.removeScore(r, c);
      this.activeRC = [r, c];
    },
    removeScore(r, c) {
      const len = scores.length;
      if (len < 2) {
        this.showWin = '已经下满棋盘! 和局!';
        return;
      }
      let k = 0;
      while (k < len) {
        if (scores[k].r === r && scores[k].c === c) {
          scores.splice(k, 1);
          return;
        }
        k += 1;
      }
    },
    lastStep() {
      if (this.showWin != null || !this.gameIng) {
        // eslint-disable-next-line
        return;
      }
      const s1 = steps.pop();
      const s2 = steps.pop();
      if (s1) {
        reStep = true;
        this.$set(this.matrix[s1[0]], s1[1], 0);
      }
      if (s2) {
        reStep = true;
        this.$set(this.matrix[s2[0]], s2[1], 0);
      }
      let lastChess = [-1, -1];
      if (steps.length > 0) {
        lastChess = [steps[steps.length - 1][0], steps[steps.length - 1][1]];
      }
      this.lastChess = lastChess;
    },
    reGame() {
      this.gameIng = false;
      this.reGameIng = true;
      this.AIplay = false;
      steps = this.whichChess === 1 ? [[7, 7, 2]] : [];
      scores = initScores(...(this.whichChess === 1 ? [7, 7] : []));
      this.activeRC = this.whichChess === 1 ? [7, 7] : [0, 0];
      this.lastChess = this.whichChess === 1 ? [7, 7] : [-1, -1];
      this.showWin = null;
      this.matrix = initMatrix(...(this.whichChess === 1 ? [7, 7, 2] : []));
    },
  },
  computed: {
    nowChessShow() {
      if (+this.whichChess === 2) {
        return this.AIplay;
      }
      return !this.AIplay;
    },
  },
};
</script>

<style lang="less" scoped>
.wuziqi {
  h1 {
    margin-top: 0;
    color: #d43a3a;
    font-weight: normal;
    text-align: center;
    text-shadow: 0 0 4px;
    box-shadow: 0 0 4px #000;
    background: #d2b295;    
  }
}
</style>
