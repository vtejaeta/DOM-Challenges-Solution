/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
  // write logic to create star rating utility.
  let parentNode = document.querySelector(el);
  let activeId = -1;

  // Append empty filled stars to parentElement
  function init(count) {
    for (let i = 1; i <= count; i++) {
      let starNode = getStarNode();
      starNode.dataset.id = i;
      parentNode.appendChild(starNode);
    }
  }

  // helper fn to return star node
  function getStarNode() {
    let starNode = document.createElement("i");
    starNode.className = "fa fa-star-o";

    starNode.addEventListener("click", captureStarRating);
    starNode.addEventListener("mouseenter", handlePaintOnHover);
    starNode.addEventListener("mouseleave", handlePaintRemoval);

    return starNode;
  }

  // get target node id and paint stars till that id
  function captureStarRating(e) {
    activeId = parseInt(e.target.dataset.id) || 0;

    paint(activeId);

    callback(activeId);
  }

  // remove prev paints and paint till that id
  function paint(id) {
    for (let i = 1; i <= count; i++) {
      parentNode.children[i - 1].classList.remove("fa-star");
      parentNode.children[i - 1].classList.add("fa-star-o");
    }

    for (let i = 1; i <= id; i++) {
      parentNode.children[i - 1].classList.add("fa-star");
    }
  }

  //get curent hover node id and paint till that id
  function handlePaintOnHover(e) {
    let currentNode = e.target;
    let id = parseInt(currentNode.dataset.id) || 0;

    paint(id);
  }

  //on mouse leave, paint till prev activeId
  function handlePaintRemoval() {
    paint(activeId);
  }

  init(count);
}
