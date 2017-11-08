import checkChess from './checker.js';

let matrix = [
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
let scores = [];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    scores.push({
      r: i,
      c: j,
      person: 0,
      ai: 0
    });
  }
}
// ai : 1
function matrix(matrix, scores, r, c, data) {
  let rMin = r < 5 ? 0 : r - 4,
      rMax = r > 10 ? 10 : r + 4,
      cMin = c < 5 ? 0 : c - 4,
      cMax = c > 10 ? 10 : c + 4;

  // 行
  let i=1, len=1;
  while(true){
    matrix
  }
}

function getChessScore(matrix, r, c, data){
  let type = [];
  // 行
  let i=1, leftLen=0, leftZeroLen=0, rightLen=0, rightZeroLen=0;
  while(true){
    if (c < i || matrix[r][c - i] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while(true){
    if (c < i || matrix[r][c - i] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i=1;
  while(true){
    if (c + i > 14 || matrix[r][c + i] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while(true){
    if (c + i > 14 || matrix[r][c + i] !== 0) {
      break;
    }
    rightZeroLen++;
    i++;
    if (rightZeroLen > 3) {
      break;
    }
  }
  // 成5
  if (leftLen + rightLen + 1 >= 5){
    return 100000;
  }
  type.push(chessType(leftLen, leftZeroLen, rightLen, rightZeroLen));

  // 列
  i=1, leftLen=0, leftZeroLen=0, rightLen=0, rightZeroLen=0;
  while(true){
    if (r < i || matrix[r - i][c] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while(true){
    if (r < i || matrix[r - i][c] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i=1;
  while(true){
    if (r + i > 14 || matrix[r + i][c] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while(true){
    if (r + i > 14 || matrix[r + i][c] !== 0) {
      break;
    }
    rightZeroLen++;
    i++;
    if (rightZeroLen > 3) {
      break;
    }
  }
  // 成5
  if (leftLen + rightLen + 1 >= 5){
    return 100000;
  }
  type.push(chessType(leftLen, leftZeroLen, rightLen, rightZeroLen));

  // 反斜杠 \
  i=1, leftLen=0, leftZeroLen=0, rightLen=0, rightZeroLen=0;
  while(true){
    if (r < i || c < i || matrix[r - i][c - i] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while(true){
    if (r < i || c < i || matrix[r - i][c - i] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i=1;
  while(true){
    if (r + i > 14 || c + i > 14 || matrix[r + i][c + i] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while(true){
    if (r + i > 14 || c + i > 14 || matrix[r + i][c + i] !== 0) {
      break;
    }
    rightZeroLen++;
    i++;
    if (rightZeroLen > 3) {
      break;
    }
  }
  // 成5
  if (leftLen + rightLen + 1 >= 5){
    return 100000;
  }
  type.push(chessType(leftLen, leftZeroLen, rightLen, rightZeroLen));

  // 斜杠 /
  i=1, leftLen=0, leftZeroLen=0, rightLen=0, rightZeroLen=0;
  while(true){
    if (r + i > 14 || c < i || matrix[r + i][c - i] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while(true){
    if (r + i > 14 || c < i || matrix[r + i][c - i] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i=1;
  while(true){
    if (r < i || c + i > 14 || matrix[r - i][c + i] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while(true){
    if (r < i || c + i > 14 || matrix[r - i][c + i] !== 0) {
      break;
    }
    rightZeroLen++;
    i++;
    if (rightZeroLen > 3) {
      break;
    }
  }
  // 成5
  if (leftLen + rightLen + 1 >= 5){
    return 100000;
  }
  type.push(chessType(leftLen, leftZeroLen, rightLen, rightZeroLen));

/*
1. 成5。机器：100000，人：100000；
2. 活4,双死4,死4活3。机器：10000，人：10000；
3. 双活3。机器：5000，人：5000；
4. 死3活3。机器：1000，人：1000；
5. 死4。机器：500，人：500；
6. 低级死4。机器：400，人：400；
7. 单活3。机器：100，人：100；
8. 跳活3。机器：90，人：90；
9. 双活2。机器：50，人：50；
10. 活2。机器：10，人：10；
11. 低级活2。机器：9，人：9；
12. 死3。机器：5，人：5；
13. 死2。机器：2，人：2；
14. 其它 1
*/
  let typeScore = [1,2,5,9,10,100,150,1000,500,10000];

}

function chessType(leftLen, leftZeroLen, rightLen, rightZeroLen){
  if (leftLen + rightLen + 1 >= 4){
    if (rightZeroLen > 0 && leftZeroLen > 0) {
      // 活四
      return 9;
    } else if (rightZeroLen > 0 || leftZeroLen > 0){
      // 死四
      return 8;
    }
  } else if(leftLen + rightLen + 1 >= 3){
    if ((leftZeroLen > 1 && rightZeroLen > 0) || (leftZeroLen > 0 && rightZeroLen > 1)) {
      // 活三
      return 7;
    } else if (leftZeroLen > 0 && rightZeroLen > 0) {
      // 死三
      return 6;
    } else if (leftZeroLen > 1 || rightZeroLen > 1) {
      // 单三
      return 5;
    }
  } else if(leftLen + rightLen + 1 >= 2){
    if (leftZeroLen + rightZeroLen > 2) {
      if ((leftZeroLen > 2 && rightZeroLen > 1) || (leftZeroLen > 1 && rightZeroLen > 2)) {
        // 活二
        return 4;
      } else if (leftZeroLen > 1 && rightZeroLen > 1) {
        // 低活二
        return 3;
      } else if (leftZeroLen > 0 && rightZeroLen > 0) {
        // 死二
        return 2;
      } else if (leftZeroLen > 2 || rightZeroLen > 2) {
        // 单二
        return 1;
      }
    }
  }
  return 0;
}
