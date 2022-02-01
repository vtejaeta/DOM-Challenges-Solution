/*
 * Creates chess board which highlights diagonals of selected cell
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function ChessBoard(el, rows, cols) {
  let parentNode = document.querySelector(el),
    diagonalCells = [];

  function init(parentNode, rows, cols) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < rows * cols; i++) {
      let cell = document.createElement("div");
      let cellBg = getCellBg(i);
      cell.className = `cell ${cellBg}`;
      cell.dataset.bgColor = cellBg;
      cell.dataset.id = `${i}`;
      //   cell.innerText = `${i}`;

      cell.addEventListener("click", paintDiagonals);

      fragment.appendChild(cell);
    }

    parentNode.appendChild(fragment);
  }

  function getCellBg(i) {
    let rowIndex = Math.floor(i / 8);

    let colors = rowIndex % 2 == 0 ? ["black", "white"] : ["white", "black"];

    return i % 2 == 0 ? colors[1] : colors[0];
  }

  function paintDiagonals(e) {
    resetBoard();

    let element = e.target;
    let currentIndex = parseInt(element.dataset.id) || 0;
    getDiagonalIndices(currentIndex);

    diagonalCells.forEach((index) => {
      let diagonalElement = parentNode.children[index];
      diagonalElement.style.backgroundColor = "crimson";
    });
  }

  function getDiagonalIndices(currentIndex) {
    let rowIndex = Math.floor(currentIndex / rows),
      colIndex = currentIndex % rows;
    let topLeft = getTopLeft(rowIndex, colIndex),
      topRight = getTopRight(rowIndex, colIndex, cols),
      bottomLeft = getBottomLeft(rowIndex, colIndex, rows),
      bottomRight = getBottomRight(rowIndex, colIndex, rows, cols);

    diagonalCells = [
      currentIndex,
      ...topLeft,
      ...topRight,
      ...bottomLeft,
      ...bottomRight,
    ];
  }

  function resetBoard() {
    diagonalCells.forEach((diagonalIndex) => {
      let element = parentNode.children[diagonalIndex];
      let originalBg = element.dataset.bgColor;
      element.style.backgroundColor = originalBg;
    });
  }

  function getTopLeft(row, col) {
    let result = [];

    while (--row >= 0 && --col >= 0) {
      result.push(row * 8 + col);
    }

    return result;
  }

  function getTopRight(row, col, colLength) {
    let result = [];

    while (--row >= 0 && ++col < colLength) {
      result.push(row * 8 + col);
    }

    return result;
  }

  function getBottomLeft(row, col, rowLength) {
    let result = [];

    while (++row < rowLength && --col >= 0) {
      result.push(row * 8 + col);
    }

    return result;
  }

  function getBottomRight(row, col, rowLength, colLength) {
    let result = [];

    while (++row < rowLength && ++col < colLength) {
      result.push(row * 8 + col);
    }

    return result;
  }

  init(parentNode, rows, cols);
}
