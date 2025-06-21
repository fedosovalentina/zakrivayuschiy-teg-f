
// === Падающие элементы (1, 0 и SVG) ===

// 1. Создаем контейнер
const layer = document.createElement('div');
layer.className = 'falling-layer';
layer.setAttribute('aria-hidden', 'true');
document.body.appendChild(layer);

// 2. Добавляем SVG-спрайт
const svgSprite = `
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="icon-floppy" viewBox="0 0 28 28" fill="currentColor">
    <rect width="28" height="28" rx="4" fill="currentColor"/>
  </symbol>
  <symbol id="icon-code" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5l-6 7 6 7M16 5l6 7-6 7" />
  </symbol>
</svg>
`;
document.body.insertAdjacentHTML('beforeend', svgSprite);

// 3. Добавляем стили
const style = document.createElement('style');
style.textContent = `
.falling-layer {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow: hidden;
}
.falling {
  position: absolute;
  top: -40px;
  color: #000;
  font-family: monospace;
  font-size: 18px;
  opacity: 1;
  animation: fall-down linear forwards;
}
.falling svg {
  width: 24px;
  height: 24px;
  fill: #000;
  opacity: 0.8;
}
@keyframes fall-down {
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }
  100% {
    transform: translateY(110vh);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

// 4. Запуск генерации падающих элементов
const items = ['1', '0', 'svg:icon-floppy', 'svg:icon-code'];

function createFallingItem() {
  const el = document.createElement('div');
  el.className = 'falling';

  const choice = items[Math.floor(Math.random() * items.length)];
  if (choice.startsWith('svg:')) {
    const id = choice.replace('svg:', '');
    el.innerHTML = `<svg viewBox="0 0 28 28"><use href="#${id}"></use></svg>`;
  } else {
    el.textContent = choice;
  }

  el.style.left = Math.floor(Math.random() * 100) + 'vw';
  el.style.animationDuration = (3 + Math.random() * 4).toFixed(1) + 's';

  el.addEventListener('animationend', () => el.remove());

  layer.appendChild(el);
}

function loop() {
  createFallingItem();
  setTimeout(loop, 1000 + Math.random() * 4000);
}

loop();
