export default function checkChess(matrix, r, c, data) {
  let i;
  const rMin = r < 6 ? 0 : r - 5,
    rMax = r > 9 ? 10 : r + 5,
    cMin = r < 6 ? 0 : r - 5,
    cMax = r > 9 ? 10 : r + 5,
    rowData = matrix[r],
    colData = Array.from({ length: matrix[0].length }).map((_, index) => matrix[index][c]);

  // 验证 行
  for (i = cMin; i <= cMax; i++) {
    if (rowData.slice(i, i + 5).every((item) => data === item)) {
      return true;
    }
  }
  // 验证 列
  for (i = rMin; i <= rMax; i++) {
    if (colData.slice(i, i + 5).every((item) => data === item)) {
      return true;
    }
  }

  // 验证 反斜杠 \
  let len = 1;
  i = 1;
  while (true) {
    if (r < i || c < i || matrix[r - i][c - i] !== data) {
      break;
    }
    len++;
    i++;
  }
  i = 1;
  while (true) {
    if (r + i > 14 || c + i > 14 || matrix[r + i][c + i] !== data) {
      break;
    }
    len++;
    i++;
  }
  if (len > 4) {
    return true;
  }
  // 验证 正斜杠 /
  len = 1;
  i = 1;
  while (true) {
    if (r < i || c + i > 14 || matrix[r - i][c + i] !== data) {
      break;
    }
    len++;
    i++;
  }
  i = 1;
  while (true) {
    if (r + i > 14 || c < i || matrix[r + i][c - i] !== data) {
      break;
    }
    len++;
    i++;
  }
  if (len > 4) {
    return true;
  }

  return false;
}
