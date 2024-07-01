// wingdings.js
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ratio = window.devicePixelRatio;
let width = canvas.width;
let height = canvas.height;
let bandThickness = height / 7;

const resize = () => {
  ctx = canvas.getContext("2d");
  ratio = window.devicePixelRatio;
  width = canvas.width;
  height = canvas.height;
  ctx.scale(2, 2);
};

export const drawWaves = () => {
  resize();
  const waves = [];

  const COLORS = [
    ["#390aad", "#2408a1"],
    ["#279ED7", "#4e42f9"],
    ["#FF7FFC", "#ea7d5d"],
    ["#faf0a3", "#f58f8d"],
  ];

  const grad = (index) => {
    const a = COLORS[index][0];
    const b = COLORS[index][1];
    const grd = ctx.createLinearGradient(0, bandThickness, 0, height / 2);
    grd.addColorStop(0, a);
    grd.addColorStop(1, b);
    return grd;
  };

  class Point {
    constructor(args) {
      this.x = args.x;
      this.y = args.y;
      this.index = args.index;
      this.ticks = 1 + args.index * 2;
    }

    update() {
      this.ticks++;
    }

    genY() {
      const a = Math.sin(this.ticks / 30 + this.index / 4) * 8;
      const b = Math.sin(this.ticks / 40 + this.index / 2) * 10;
      const c = Math.cos(this.ticks / 50 + this.index / 8) * 4;
      return a + b + c + this.y;
    }
  }

  const initWaves = (amt) => {
    for (let i = 0; i < amt; i++) {
      const points = 40;
      waves.push([]);
      for (let j = 0; j < points; j++) {
        waves[i].push(
          new Point({
            x: (j * width) / points - 50,
            y: bandThickness * i + 25,
            index: j,
          })
        );
      }
    }
    window.requestAnimationFrame(draw);
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < waves.length; i++) {
      const len = waves[i].length;
      ctx.beginPath();
      ctx.moveTo(waves[i][0].x, waves[i][0].y);
      for (let j = 0; j < len; j++) {
        const point = waves[i][j];
        ctx.lineTo(point.x, point.genY());
        point.update();
      }
      ctx.lineWidth = bandThickness;
      ctx.strokeStyle = grad(i);
      ctx.stroke();
    }
    window.requestAnimationFrame(draw);
  };

  initWaves(4);
};

window.addEventListener("resize", resize, false);
