let fps = 1000 / 60;

/*
 * Creates pixel art grid
 * @param parentEl DOM Element
 * @param countEl DOM Element
 */
function ProgressBar(parentEl, duration, countEl) {
  let barElement = document.createElement("div");
  barElement.className = "bar";
  parentEl.appendChild(barElement);

  let isAnimating = false,
    startTime = null,
    queueCount = 0;

  function animate() {
    if (startTime == null) {
      startTime = Date.now();
    }

    let elapsedTimeInSeconds = Date.now() - startTime;

    let width = Math.min((elapsedTimeInSeconds / duration) * 100, 100);
    barElement.style.width = `${width}%`;

    if (elapsedTimeInSeconds >= duration) {
      queueCount--;
      countEl.innerText = queueCount > 0 ? `${queueCount}` : "";

      barElement.style.width = "0%";
      startTime = null;

      if (queueCount <= 0) {
        isAnimating = false;
        return;
      }
    }

    setTimeout(animate, fps);
  }

  function load() {
    queueCount++;
    countEl.innerText = queueCount > 0 ? `${queueCount}` : "";

    if (!isAnimating) {
      isAnimating = true;
      animate();
    }
  }

  return { load };
}
