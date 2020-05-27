const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const fill = document.getElementById("jsMode");
const brush = document.getElementById("jsRange");
const saveJpgBtn = document.getElementById("jsJpgSave");
const savePngBtn = document.getElementById("jsPngSave");

const ctx = canvas.getContext("2d");

const FIRST_COLOR = "#2c2c2c";

ctx.strokeStyle = FIRST_COLOR;
ctx.fillStyle = FIRST_COLOR;
ctx.lineWidth = 2.5;

canvas.width = 700;
canvas.height = 800;

let painting = false;

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleFillClick(e) {
  if (fill.innerText === "FILL OFF") {
    fill.innerText = "FILL ON";
  } else {
    fill.innerText = "FILL OFF";
  }
}

function handleFillCanvas(e) {
  if (fill.innerText === "FILL ON") {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function handleBrushRange(e) {
  ctx.lineWidth = e.target.value;
}

function saveName() {
  const name = prompt("파일 저장명을 입력해주세요.", "file");
  return name;
}

function handleSaveJpgClick(e) {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = saveName();
  link.click();
  console.log(link);
}

function handleSavePngClick(e) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = saveName();
  link.click();
  console.log(link);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseover", stopPainting);
  canvas.addEventListener("mouseout", stopPainting);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("click", handleFillCanvas);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (fill) {
  fill.addEventListener("click", handleFillClick);
}

if (brush) {
  brush.addEventListener("input", handleBrushRange);
}

if (saveJpgBtn) {
  saveJpgBtn.addEventListener("click", handleSaveJpgClick);
}

if (savePngBtn) {
  savePngBtn.addEventListener("click", handleSavePngClick);
}
