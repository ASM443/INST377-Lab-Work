document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const width = 10;

  const lShape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zShape = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tShape = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oShape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iShape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theShapes = [lShape, zShape, tShape, oShape, iShape];

  let currentPosition = 4;
  const currentRotation = 0;
  let random = Math.floor(Math.random() * theShapes.length);
  console.log(random);

  let current = theShapes[0][0];

  function draw() {
    current.forEach((x) => {
      squares[currentPosition + x].classList.add('shape');
    });
  }

  function undraw() {
    current.forEach((x) => {
      squares[currentPosition + x].classList.remove('shape');
    });
  }

  timerId = setInterval(moveDown, 300);

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (current.some((x) => squares[currentPosition + x + width].classList.contains('taken'))) {
      current.forEach((x) => squares[currentPosition + x].classList.add('taken'));
      random = Math.floor(Math.random() * theShapes.length);
      current = theShapes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  function moveLeft() {
    undraw();
    const isALeftEdge = current.some((x) => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some((x) => squares[currentPosition + x].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  }
});
