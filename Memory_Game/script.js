const defaultBg = "#eeefef";
const blueBg = "#3366d6";
const errorBg = "crimson";
const successBg = "green";

function MemoryGame(parentElement, cellCount, scoreElement, highScoreElement) {
  let currentScore = 0,
    highScore = localStorage.getItem("memoryGameHighScore") || 0,
    runElement = null,
    highlightIndices = [],
    isAnimating = false,
    curIndex = 0;

  function init(parentElement) {
    let fragment = document.createDocumentFragment();

    highScoreElement.innerText = highScore;

    for (let i = 1; i <= cellCount; i++) {
      let block = document.createElement("div");
      block.className = "block";
      block.dataset.id = i - 1;

      block.addEventListener("click", handleCellClick);

      fragment.appendChild(block);
    }

    parentElement.appendChild(fragment);
  }

  function load(e) {
    if (isAnimating) return;

    runElement = e.target;
    runElement.disabled = true;

    startGame();
  }

  function startGame() {
    highlightIndices = getRandomIndices(currentScore + 1);

    blinkBlocks();
  }

  async function blinkBlocks() {
    isAnimating = true;
    for (let i = 0; i < highlightIndices.length; i++) {
      let index = highlightIndices[i];
      let elementAtIndex = parentElement.children[index];
      await delay(500);
      elementAtIndex.style.backgroundColor = blueBg;
      await delay(800);
      elementAtIndex.style.backgroundColor = defaultBg;
    }
    isAnimating = false;
  }

  function getRandomIndices(indexCount) {
    let randomIndices = [];

    for (let i = 1; i <= indexCount; i++) {
      let randomIndex = Math.floor(Math.random() * cellCount);
      randomIndices.push(randomIndex);
    }

    return randomIndices;
  }

  async function handleCellClick(e) {
    if (isAnimating) return;

    let currentCell = e.target;
    let elementId = Number(currentCell.dataset.id);

    if (elementId != highlightIndices[curIndex]) {
      shakeAndReset(currentCell);
      return;
    }

    currentCell.style.backgroundColor = successBg;
    await delay(500);
    currentCell.style.backgroundColor = defaultBg;
    curIndex++;

    if (curIndex == highlightIndices.length) {
      currentScore++;
      updateScoreAndHighScore();
      curIndex = 0;
      startGame();
    }
  }

  async function shakeAndReset(currentElement) {
    currentElement.style.backgroundColor = errorBg;
    parentElement.classList.add("shake");
    await delay(500);
    currentElement.style.backgroundColor = defaultBg;
    parentElement.classList.remove("shake");

    resetGame();
  }

  function resetGame() {
    updateScoreAndHighScore();

    curIndex = 0;
    currentScore = 0;

    runElement.disabled = false;
    scoreElement.innerText = 0;
  }

  function updateScoreAndHighScore() {
    scoreElement.innerText = currentScore;
    let prevHighScore = parseInt(highScoreElement.innerText) || 0;
    let newHighScore =
      currentScore > prevHighScore ? currentScore : prevHighScore;
    highScoreElement.innerText = newHighScore;
    localStorage.setItem("memoryGameHighScore", newHighScore);
  }

  function delay(delayTime) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), delayTime);
    });
  }

  init(parentElement);

  return { load };
}
