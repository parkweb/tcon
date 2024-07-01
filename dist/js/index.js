// mouse pointer move burbble
const interBubble = document.querySelector(".interactive");
let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

const move = () => {
  curX += (tgX - curX) / 40;
  curY += (tgY - curY) / 40;
  interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
  requestAnimationFrame(move);
};

const initMouseTracking = () => {
  window.addEventListener("mousemove", ({ clientX, clientY }) => {
    tgX = clientX;
    tgY = clientY;
  });
  move();
};
// mouse pointer move burbble END

// width height size
const setGradientContainerHeight = () => {
  const container = document.querySelector(".gradients-container");
  if (container) {
    const { offsetWidth } = container;
    container.style.height = `${offsetWidth}px`;
  }
};
// width height size END

// animejs :: index opacity animation
const initAnime = () => {
  anime({
    targets: ".anime-wrap .anime-mask",
    opacity: [0, 1],
    filter: "blur(0px)",
    scale: 1,
    delay: anime.stagger(200, { start: 300 }),
    easing: "easeInOutQuad",
  });

  var textWrapper = document.querySelector(".ml13");
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml13 .letter",
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i,
    })
    .add({
      targets: ".ml13 .letter",
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el, i) => 100 + 30 * i,
    });
};
// animejs END

// 이벤트 리스너 설정
window.addEventListener("load", setGradientContainerHeight);
window.addEventListener("resize", setGradientContainerHeight);
document.addEventListener("DOMContentLoaded", initAnime);

export { move, initMouseTracking, initAnime };
