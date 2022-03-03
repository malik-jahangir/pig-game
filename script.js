'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const totalScore0 = document.getElementById('score--0');
const totalScore1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');

const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

let gameStart, cp0, tsp0, tsp1, csp0, csp1, diceValue;
let winnigScore = 50;

// function randomStart() {
//   cp0 = Math.random() < 0.5;
//   console.log(cp0);
// }

function reset() {
  gameStart = true;
  // randomStart();
  cp0 = true;
  tsp0 = 0;
  tsp1 = 0;
  csp0 = 0;
  csp1 = 0;
  diceValue = 0;
  totalScore0.textContent = '0';
  totalScore1.textContent = '0';
  currentScore0.textContent = '0';
  currentScore1.textContent = '0';
  dice.src = `dice-1.png`;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.style.display = 'block';
  roll.style.display = 'block';
  hold.style.display = 'block';

  // if (cp0) {
  //   player0.classList.add('player--active');
  //   player1.classList.remove('player--active');
  // } else {
  //   player0.classList.remove('player--active');
  //   player1.classList.add('player--active');
  // }
}
reset();

function randomNumber() {
  diceValue = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceValue}.png`;
  return diceValue;
}

function playerChange() {
  cp0 = !cp0;
  csp1 = 0;
  csp0 = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  currentScore0.textContent = csp0;
  currentScore1.textContent = csp1;
}
function winner() {
  gameStart = false;
  tsp0 >= winnigScore
    ? player0.classList.add('player--winner')
    : player1.classList.add('player--winner');
  dice.style.display = 'none';
  roll.style.display = 'none';
  hold.style.display = 'none';
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
}

roll.addEventListener('click', () => {
  randomNumber();

  if (diceValue == 1) {
    playerChange();
  } else {
    if (cp0 == true) {
      csp0 += diceValue;
      currentScore0.textContent = csp0;
    } else {
      csp1 += diceValue;
      currentScore1.textContent = csp1;
    }
  }
});

hold.addEventListener('click', () => {
  cp0 ? (tsp0 += csp0) : (tsp1 += csp1);
  totalScore0.textContent = tsp0;
  totalScore1.textContent = tsp1;
  tsp0 >= winnigScore || tsp1 >= winnigScore ? winner() : playerChange();
});

newGame.addEventListener('click', reset);
