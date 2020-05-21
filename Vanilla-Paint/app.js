const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  // offset 캔버스 안의 위치 탐지
  
  if(!painting){
      ctx.beginPath()
      ctx.moveTo(x,y);
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  paintion = false;
}

}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
