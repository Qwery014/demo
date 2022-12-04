const player = document.querySelector(".player");

// Ширина игры

const body = document.querySelector("body");

body.style.width = window.getComputedStyle(body).width;

if (!(body.style.width % 5)) {
  body.style.width = (Math.floor(parseInt(body.style.width) / 5)) * 5 + "px";
}

console.log(body.style.width);



// Ловушка

const trap = document.querySelector(".trap");
const grass = document.querySelector(".grass");

trap.style.bottom = window.getComputedStyle(grass).height;

// window.getComputedStyle(trap).height;

let trapLeft = window.getComputedStyle(trap).left;
let trapWidth = window.getComputedStyle(trap).width;
let trapBottom = window.getComputedStyle(trap).bottom;
let trapHeight = window.getComputedStyle(trap).height;

let playerLeft = parseInt(window.getComputedStyle(player).left);
let playerWidth = window.getComputedStyle(player).width;
let playerBottom = parseInt(window.getComputedStyle(player).bottom);
let playerHeight = window.getComputedStyle(player).height;

function checkTrap() {
  if (
    // (
    //   playerLeft >= (parseInt(trapLeft) - parseInt(playerWidth) + step)
    //   &&
    //   playerLeft <= (parseInt(trapLeft) + parseInt(trapWidth))
    // )
    // ||
    (
      playerLeft >= (parseInt(trapLeft) - parseInt(playerWidth) + step)
      &&
      playerLeft <= (parseInt(trapLeft) + parseInt(trapWidth))
      &&
      playerBottom < (parseInt(trapBottom) + parseInt(trapHeight))
    )
  ) {
    alert("Вы проиграли!");
    location.reload();
  }
}


// Финиш

const finish = document.querySelector(".finish");

let finishLeft = window.getComputedStyle(finish).left;
let finishWidth = window.getComputedStyle(finish).width;

function checkFinish() {
  if (playerLeft > (parseInt(finishLeft) - parseInt(finishWidth))) {
    alert("Вы выиграли!");
    location.reload();
  }
}


// Ходьба

const step = 5;
player.style.left = window.getComputedStyle(player).left;
player.style.bottom = window.getComputedStyle(player).bottom;


document.addEventListener("keydown", (event) => {
  if (event.code == "KeyD") {

    if (parseInt(player.style.left) > (parseInt(body.style.width) - parseInt(window.getComputedStyle(player).width) - step)) {
      return;
    };

    player.style.left = (parseInt(player.style.left) + step) + "px";
    playerLeft += step;

    checkTrap()
    checkFinish()
  } else if (event.code == "KeyA") {

    if (player.style.left == "0px" || parseInt(player.style.left) <= 0) {
      return;
    };

    player.style.left = (parseInt(player.style.left) - step) + "px";
    playerLeft -= step;

    checkTrap()
    checkFinish()
  }
})



// Прыжок

function runOnKeys(func, ...args) {

  let arrChars = [];                    // массив одновременно нажатых клавиш

  document.addEventListener("keydown", function (event) {
    if (event.repeat) return;         // повторы не обрабатываем
    arrChars.push(event.code);        // запоминаем код нажатой и пока еще не отпущенной клавиши

    let runFunc = true;
    for (let arg of args) {           // нажаты ли одновременно отслеживаемые клавиши
      if (!arrChars.includes(arg)) {
        runFunc = false;
        break;
      }
    }
    if (runFunc) func();              // если нажаты, запускаем заданный код
  });

  document.addEventListener("keyup", function (event) {
    if (arrChars.length == 0) return; // нечего обрабатывать, завершаем функцию

    arrChars.length = 0;              // очистим массив одновременно нажатых клавиш
  });

}


runOnKeys(
  () => {

  },
  ""
);

let countJump = 0;

document.addEventListener("keydown", (event) => {
  if (event.code == "Space") {
    if (event.repeat) return;

    let countUp = 0;

    if (!countJump) {
      let jumpUp = setInterval(() => {
        countJump = 1;
        if (countUp < 10) {
          player.style.bottom = (parseInt(player.style.bottom) + 10) + "px";
          countUp++;
          playerBottom += 10;
          checkTrap();
        } else if (countUp >= 10 && countUp < 20) {
          player.style.bottom = (parseInt(player.style.bottom) - 10) + "px";
          countUp++;
          playerBottom -= 10;
          checkTrap();
        } else {
          clearInterval(jumpUp);
          countUp = 0;
          setTimeout(() => {
            countJump = 0;
          }, 500);
        }
      }, 100);
    };
    checkTrap()
  }
})


