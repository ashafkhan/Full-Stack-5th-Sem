const svg = document.getElementById("drawingArea");
let drawing = false;
let rect = null;
let startX, startY;

svg.addEventListener("mousedown", (e) => {
  drawing = true;
  startX = e.offsetX;
  startY = e.offsetY;

  rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", startX);
  rect.setAttribute("y", startY);
  rect.setAttribute("width", 0);
  rect.setAttribute("height", 0);
  rect.setAttribute("fill", "rgba(0, 150, 255, 0.3)");
  rect.setAttribute("stroke", "#007bff");
  rect.setAttribute("stroke-width", "2");
  svg.appendChild(rect);
});

svg.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const currentX = e.offsetX;
  const currentY = e.offsetY;

  const width = currentX - startX;
  const height = currentY - startY;

  rect.setAttribute("x", Math.min(currentX, startX));
  rect.setAttribute("y", Math.min(currentY, startY));
  rect.setAttribute("width", Math.abs(width));
  rect.setAttribute("height", Math.abs(height));
});

svg.addEventListener("mouseup", () => {
  drawing = false;
  rect = null;
});

svg.addEventListener("mouseleave", () => {
  drawing = false;
  rect = null;
});
