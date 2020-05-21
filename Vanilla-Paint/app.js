const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const saveJpgBtn = document.getElementById("jsJpgSave");
const savePngBtn = document.getElementById("jsPngSave");

const FIRST_COLOR = "#2c2c2c";

ctx.strokeStyle = FIRST_COLOR;
ctx.fillStyle = FIRST_COLOR;
ctx.lineWidth = 2.5;

canvas.width = 700;
canvas.height = 600;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleFillChange(event) {
  if (filling === true) {
    filling = false;
    fill.innerText = "FILL OFF";
  } else {
    filling = true;
    fill.innerText = "FILL ON";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  // offset 캔버스 안의 위치 탐지

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// 마우스 우클릭 금지 이벤트
function handleCM(event) {
  event.preventDefault();
}

function saveName() {
  const Name = prompt("파일 저장명을 입력해주세요", "");
  return Name;
}
function handleJpgSave(event) {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = saveName();
  link.click();
  console.log(link);
}

function handlePngSave(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = saveName();
  link.click();
  console.log(link);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

// array가 비어져있을수도 있으므로 if문 사용
if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (fill) {
  fill.addEventListener("click", handleFillChange);
}

if (saveJpgBtn) {
  saveJpgBtn.addEventListener("click", handleJpgSave);
}

if (savePngBtn) {
  savePngBtn.addEventListener("click", handlePngSave);
}
