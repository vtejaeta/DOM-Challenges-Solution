const getRandomColors = function () {
  var ratio = 0.618033988749895;

  var hue = (Math.random() + ratio) % 1;
  var saturation = Math.round(Math.random() * 100) % 85;
  var lightness = Math.round(Math.random() * 100) % 85;

  var color =
    "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + lightness + "%)";
  var oddColor =
    "hsl(" +
    Math.round(360 * hue) +
    "," +
    saturation +
    "%," +
    (lightness + 5) +
    "%)";

  return {
    color,
    oddColor,
  };
};

/*
 * Creates Color Spotter grid
 * @param el DOM Element
 * @param N size of grid - NxN
 * @param scoreEl DOM Element
 */
function ColorSpotter(el, N, scoreEl) {
  let parentElement = document.querySelector(el),
    scoreElement = document.querySelector(scoreEl),
    oddIndex = -1,
    currentGridSize = N,
    score = 0,
    isShaking = false;

  function init(parentElement, N) {
    clearGrid();

    let cellCount = Math.pow(N, 2);

    let randomIndex = getRandomIndex(cellCount);
    let { color, oddColor } = getRandomColors();
    let fragment = document.createDocumentFragment();

    parentElement.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
    scoreElement.innerText = `Score: ${score}`;
    oddIndex = randomIndex;

    for (let i = 0; i < cellCount; i++) {
      let cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.style.backgroundColor = i == oddIndex ? oddColor : color;
      cellElement.dataset.id = i;

      cellElement.addEventListener("click", captureClick);

      fragment.appendChild(cellElement);
    }

    parentElement.appendChild(fragment);
  }

  function wait(time) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(1), time);
    });
  }

  async function captureClick(e) {
    if (isShaking) return;

    let currentElement = e.target;
    let id = currentElement.dataset.id;

    if (id != oddIndex) {
      parentElement.className = "shake";
      isShaking = true;
      await wait(800);
      isShaking = false;

      //reset score and grid;
      score = 0;
      currentGridSize = N;
      init(parentElement, currentGridSize);
      return;
    }

    score++;
    currentGridSize++;
    init(parentElement, currentGridSize);
  }

  function clearGrid() {
    parentElement.classList.remove("shake");
    while (parentElement.firstChild) {
      parentElement.firstChild.remove();
    }
  }

  function getRandomIndex(N) {
    return Math.floor(Math.random() * N);
  }

  init(parentElement, currentGridSize);
}
