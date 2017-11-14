function chessType(leftLen, leftZeroLen, rightLen, rightZeroLen) {
  if (leftLen + rightLen + 1 >= 4) {
    if (rightZeroLen > 0 && leftZeroLen > 0) {
      // 活四
      return 9;
    } else if (rightZeroLen > 0 || leftZeroLen > 0) {
      // 死四
      return 8;
    }
  } else if (leftLen + rightLen + 1 >= 3) {
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
  } else if (leftLen + rightLen + 1 >= 2) {
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

function getChessScore(matrix, r, c, data) {
  const type = [];
  // 行
  let i = 1,
    leftLen = 0,
    leftZeroLen = 0,
    rightLen = 0,
    rightZeroLen = 0;
  while (true) {
    if (c < i || matrix[r][c - i] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while (true) {
    if (c < i || matrix[r][c - i] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i = 1;
  while (true) {
    if (c + i > 14 || matrix[r][c + i] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while (true) {
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
  if (leftLen + rightLen + 1 >= 5) {
    return 100000;
  }
  type.push(chessType(leftLen, leftZeroLen, rightLen, rightZeroLen));

  // 列
  i = 1, leftLen = 0, leftZeroLen = 0, rightLen = 0, rightZeroLen = 0;
  while (true) {
    if (r < i || matrix[r - i][c] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while (true) {
    if (r < i || matrix[r - i][c] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i = 1;
  while (true) {
    if (r + i > 14 || matrix[r + i][c] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while (true) {
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
  if (leftLen + rightLen + 1 >= 5) {
    return 100000;
  }
  type.push(chessType(leftLen, leftZeroLen, rightLen, rightZeroLen));

  // 反斜杠 \
  i = 1, leftLen = 0, leftZeroLen = 0, rightLen = 0, rightZeroLen = 0;
  while (true) {
    if (r < i || c < i || matrix[r - i][c - i] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while (true) {
    if (r < i || c < i || matrix[r - i][c - i] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i = 1;
  while (true) {
    if (r + i > 14 || c + i > 14 || matrix[r + i][c + i] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while (true) {
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
  if (leftLen + rightLen + 1 >= 5) {
    return 100000;
  }
  type.push(chessType(leftLen, leftZeroLen, rightLen, rightZeroLen));

  // 斜杠 /
  i = 1, leftLen = 0, leftZeroLen = 0, rightLen = 0, rightZeroLen = 0;
  while (true) {
    if (r + i > 14 || c < i || matrix[r + i][c - i] !== data) {
      break;
    }
    leftLen++;
    i++;
  }
  while (true) {
    if (r + i > 14 || c < i || matrix[r + i][c - i] !== 0) {
      break;
    }
    leftZeroLen++;
    i++;
    if (leftZeroLen > 3) {
      break;
    }
  }
  i = 1;
  while (true) {
    if (r < i || c + i > 14 || matrix[r - i][c + i] !== data) {
      break;
    }
    rightLen++;
    i++;
  }
  while (true) {
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
  if (leftLen + rightLen + 1 >= 5) {
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
  const typeScore = [1, 2, 5, 9, 10, 100, 150, 1000, 500, 10000];
  const obj = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  obj[type[0]] = 1;
  obj[type[1]] += 1;
  obj[type[2]] += 1;
  obj[type[3]] += 1;

  let s = 0;
  if (obj[9] + obj[8] + obj[7] > 2) {
    s = 10000;
  } else if (obj[9] + obj[8] + obj[7] + obj[6] > 2) {
    s = 5000;
  } else if (obj[9] + obj[8] + obj[7] + obj[6] + obj[5] > 2) {
    s = 1000;
  } else if (obj[9] + obj[8] + obj[7] + obj[6] + obj[5] + obj[4] > 2) {
    s = 500;
  } else if (obj[9] + obj[8] + obj[7] + obj[6] + obj[5] + obj[4] + obj[3] > 2) {
    s = 400;
  } else if (obj[9] + obj[8] + obj[7] + obj[6] + obj[5] + obj[4] + obj[3] + obj[2] > 2) {
    s = 100;
  }
  s += typeScore[type[0]] + typeScore[type[1]] + typeScore[type[2]] + typeScore[type[3]];
  return s;
}

// ai : 1
export default function comput(matrix, scores, data) {
  const len = scores.length;
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      if (matrix[i][j] !== 0) {
        continue;
      }
      let k = 0;
      while (k < len) {
        if (scores[k].r === i && scores[k].c === j) {
          scores[k].s = getChessScore(matrix, i, j, [0, 2, 1][data]) * 0.2 + getChessScore(matrix, i, j, data) * 0.8;
          break;
        }
        k++;
      }
    }
  }
  scores.sort((a, b) => (b.s - a.s));
  return [scores[0].r, scores[0].c, scores[0].s];
}
