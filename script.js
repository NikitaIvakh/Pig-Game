'use strict';

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const dice_Element = document.querySelector('.dice');
const btn_New_Game = document.querySelector('.btn--new');
const btn_Roll_Game = document.querySelector('.btn--roll');
const btn_Hold_Game = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let current_Score, active_Player, total_Score_Game, is_Playing;

const switch_Between_Players = function () {
  current_Score = 0;
  document.getElementById(`current--${active_Player}`).textContent =
    current_Score;
  active_Player = active_Player == 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const start_New_Game = function () {
  current_Score = 0;
  active_Player = 0;
  total_Score_Game = [0, 0];
  is_Playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  player0Element.classList.add('player--active');
  dice_Element.classList.add('hidden');
};

start_New_Game();

btn_New_Game.addEventListener('click', start_New_Game);

btn_Roll_Game.addEventListener('click', function () {
  if (is_Playing) {
    const random_Number_on_Dice = Math.trunc(Math.random() * 6) + 1;
    console.log(random_Number_on_Dice);

    dice_Element.classList.remove('hidden');
    dice_Element.src = `images/dice${random_Number_on_Dice}.png`;

    if (random_Number_on_Dice !== 1) {
      current_Score += random_Number_on_Dice;
      document.getElementById(`current--${active_Player}`).textContent =
        current_Score;
    } else {
      switch_Between_Players();
    }
  }
});

btn_Hold_Game.addEventListener('click', function () {
  if (is_Playing) {
    total_Score_Game[active_Player] += current_Score;
    document.getElementById(`score--${active_Player}`).textContent =
      total_Score_Game[active_Player];

    if (total_Score_Game[active_Player] >= 100) {
      is_Playing = false;
      document
        .querySelector(`.player--${active_Player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_Player}`)
        .classList.remove('player--active');
      dice_Element.classList.add('hidden');
    } else {
      switch_Between_Players();
    }
  }
});