"use strict";

// here we updating the random number
let randomNumber = Math.floor(Math.random() * 20 + 1);
let resscore = 20;
let highscore = 0;

const checkEL = document.querySelector(".check");
const againEl = document.querySelector(".again");

// to display the res message here
const displayMessage = function (message) {
  const msgEl = document.querySelector(".message");
  msgEl.textContent = message;
};

// clear button
againEl.addEventListener("click", () => {
  resscore = 20;
  randomNumber = Math.floor(Math.random() * 20 + 1);
  displayMessage("Start guessing");
  const scoreEl = document.querySelector(".score");
  scoreEl.textContent = resscore;
  const numberEl = document.querySelector(".number");
  numberEl.textContent = "?";
  const inputEl = document.querySelector(".guess");
  const inputVal = Number((inputEl.value = ""));
  const bodyEl = document.querySelector("body");
  bodyEl.style.backgroundColor = "#222";
});

// check buttton
checkEL.addEventListener("click", () => {
  const inputEl = document.querySelector(".guess");
  const scoreEl = document.querySelector(".score");
  const numberEl = document.querySelector(".number");
  const highscoreEl = document.querySelector(".highscore");
  const bodyEl = document.querySelector("body");
  const inputVal = Number(inputEl.value);
  console.log(inputVal);

  // when there is no input
  if (!inputVal) {
    displayMessage("Please Enter Number");
    // when player wins
  } else if (inputVal === randomNumber) {
    displayMessage("Correct Number!");
    numberEl.textContent = randomNumber;
    bodyEl.style.backgroundColor = "#60b347";
    highscoreEl.textContent = resscore;

    // updating the new high score
    if (resscore > highscore) {
      highscore = resscore;
      const highscoreEl = document.querySelector(".highscore");
      highscoreEl.textContent = highscore; // it display the new highscore
    }

    // when guess is wrong
  } else if (inputVal !== randomNumber) {
    if (resscore > 1) {
      displayMessage(inputVal > randomNumber ? "Too High" : "Too Low");
      resscore -= 1;
      scoreEl.textContent = resscore; // it display the decreasing course
    } else {
      displayMessage("You Loss The game");
    }
  }
});

// the below code is same as when guess is wrong code above

//guessing number too high
// else if (inputVal > randomNumber) {
//   // for loss the game
//   if (resscore > 1) {
//     msgEl.textContent = "Too High";
//     resscore -= 1;
//     scoreEl.textContent = resscore;
//   } else {
//     msgEl.textContent = "You Loss The game";
//   }

//   // guessing number is too low
// } else if (inputVal < randomNumber) {
//   // for loss the game
//   msgEl.textContent = "Too Low";
//   resscore -= 1;
//   scoreEl.textContent = resscore;
// }
