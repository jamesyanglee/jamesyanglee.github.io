'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for a rolled 1: if true, switch to the next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current to score of active player
    scores[activePlayer] += currentScore;
    // scores[1] = score[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check score if the score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

/*
what we are looking for when we click on the new game button is to remove the player--winner class and to reset all the scores back to 0. essentially, we need to reset the initial conditions of the game. we already did something similar to our first game so maybe this is a challenge for us


we need btnNew so we need an event handler
btnNew.addEventListener('click', function() {

})

we want to set score0El and score1El back to zero. 

We also need to set the internal state variables back to the inital state. 
// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
we should not copy this to the btnNew function. instead we will create a function which contains this code together with the code in btnNew 


we need to use the init function on the event handler. just like before, we do not declare an anonymous function like we did before (function () {}) but instead we pass in the init function which again is just a value and so its perfectly ok to pass this value into another function. keep in mind that we do not call this function, it's javascript that does as soon as the user clicks on the new game button.
btnNew.addEventListener('click', init);

*/
