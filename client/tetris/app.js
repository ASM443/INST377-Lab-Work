document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
  ];

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
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theShapes.length);
  console.log(random);

  let current = theShapes[0][0];

  function draw() {
    current.forEach((x) => {
      squares[currentPosition + x].classList.add('shape');
      squares[currentPosition + x].style.backgroundColor = colors[random];
    });
  }

  function undraw() {
    current.forEach((x) => {
      squares[currentPosition + x].classList.remove('shape');
      squares[currentPosition + x].style.backgroundColor = '';
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
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theShapes.length);
      current = theShapes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  function moveLeft() {
    undraw();
    const isALeftEdge = current.some((x) => (currentPosition + x) % width === 0);
    if (!isALeftEdge) currentPosition -= 1;

    if (current.some((x) => squares[currentPosition + x].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  }

  function moveRight() {
    undraw();
    const isARightEdge = current.some((x) => (currentPosition + x) % width === width - 1);
    if (!isARightEdge) currentPosition += 1;

    if (current.some((x) => squares[currentPosition + x].classList.contains('taken'))) {
      currentPosition -= 1;
    }

    draw();
  }

  function rotate() {
    undraw();
    // eslint-disable-next-line no-plusplus
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theShapes[random][currentRotation];
    draw();
  }

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }

  document.addEventListener('keyup', control);

  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  const displayIndex = 0;

  const upNextShape = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]

  ];

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove('shape');
      square.style.backgroundColor = '';
    });
    console.log(nextRandom);
    upNextShape[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add('shape');
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
    });
  }

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theShapes.length);
      displayShape();
    }
  });

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('shape');
          squares[index].style.backgroundColor = '';
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end';
      clearInterval(timerId);
    }
  }
});