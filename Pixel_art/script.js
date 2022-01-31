let colorsArray = [
  "#A319F9",
  "#0E38B1",
  "#D05F9C",
  "#A57B17",
  "#5A6ED9",
  "#E3B866",
  "#B3BBDD",
  "#478068",
  "#D10425",
  "#E5F1CB",
];

/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
  // write logic to create pixel art grid.
  let parentNode = document.querySelector(el),
    activeColor = null;

  function init(parentNode, rows, cols) {
    let fragment = document.createDocumentFragment();

    // create table of cells
    for (let i = 1; i <= cols; i++) {
      let rowNode = document.createElement("div");
      rowNode.className = "row";
      for (let j = 1; j <= rows; j++) {
        let node = document.createElement("div");
        node.className = "box";
        node.draggable = true;

        // paint cell with activeColor
        node.addEventListener("click", paintCell);
        node.addEventListener("dragover", handleDrag);

        rowNode.appendChild(node);
      }
      fragment.appendChild(rowNode);
    }

    // append new row with colors
    let rowNode = document.createElement("div");
    rowNode.className = "row";
    for (let i = 1; i <= rows; i++) {
      let node = document.createElement("div");
      node.className = "box";
      node.style.backgroundColor = colorsArray[i - 1];

      node.addEventListener("click", setActiveColor);

      rowNode.appendChild(node);
    }

    fragment.appendChild(rowNode);
    parentNode.appendChild(fragment);
  }

  function setActiveColor(e) {
    let selectedNode = e.target;
    activeColor = selectedNode.style.backgroundColor || null;
  }

  function paintCell(e) {
    if (activeColor == null) return;

    let selectedNode = e.target;
    selectedNode.style.backgroundColor = activeColor;
  }

  function handleDrag(e) {
    if (!activeColor) return;

    let currentNode = e.target;

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    currentNode.style.backgroundColor = activeColor;
  }

  init(parentNode, rows, cols);
}
