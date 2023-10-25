"use strict";

// const msgEl = document.querySelector(".message");
// msgEl.textContent = "Correct Number";
// const msgElValue = msgEl.textContent; // to get the text value we use textContent
// console.log(msgElValue);

// const numberEl = document.querySelector(".number");
// numberEl.textContent = 13;
// const numvalue = numberEl.textContent;
// console.log(numvalue);

// const scoreEl = document.querySelector(".score");
// scoreEl.textContent = 10;
// const scorevalue = scoreEl.textContent;
// console.log(scorevalue);

// const inputEl = document.querySelector(".guess");
// const inputVal = (inputEl.value = 23); // to get the input value we use value property
// console.log(inputVal);

// here we updating the random number
let randomNumber = Math.floor(Math.random() * 20 + 1);
let resscore = 20;
let highscore = 0;

const checkEL = document.querySelector(".check");
const againEl = document.querySelector(".again");

againEl.addEventListener("click", () => {
  resscore = 20;
  randomNumber = Math.floor(Math.random() * 20 + 1);
  const msgEl = document.querySelector(".message");
  msgEl.textContent = "Start guessing";
  const scoreEl = document.querySelector(".score");
  scoreEl.textContent = resscore;
  const numberEl = document.querySelector(".number");
  numberEl.textContent = "?";
  const inputEl = document.querySelector(".guess");
  const inputVal = Number((inputEl.value = ""));
  const bodyEl = document.querySelector("body");
  bodyEl.style.backgroundColor = "#222";
});

checkEL.addEventListener("click", () => {
  const inputEl = document.querySelector(".guess");
  const msgEl = document.querySelector(".message");
  const scoreEl = document.querySelector(".score");
  const numberEl = document.querySelector(".number");
  const highscoreEl = document.querySelector(".highscore");
  const bodyEl = document.querySelector("body");
  const inputVal = Number(inputEl.value);
  console.log(inputVal);

  // when there is no input
  if (!inputVal) {
    msgEl.textContent = "Please Enter Number";

    // when player wins
  } else if (inputVal === randomNumber) {
    msgEl.textContent = "Correct Number!";
    numberEl.textContent = randomNumber;
    bodyEl.style.backgroundColor = "#60b347";
    highscoreEl.textContent = resscore;

    // updating the new hihh score
    if (resscore > highscore) {
      highscore = resscore;
      const highscoreEl = document.querySelector(".highscore");
      highscoreEl.textContent = highscore;
    }

    //guessing number too high
  } else if (inputVal > randomNumber) {
    // for loss the game
    if (resscore > 1) {
      msgEl.textContent = "Too High";
      resscore -= 1;
      scoreEl.textContent = resscore;
    } else {
      msgEl.textContent = "You Loss The game";
    }

    // guessing number is too low
  } else if (inputVal < randomNumber) {
    // for loss the game
    msgEl.textContent = "Too Low";
    resscore -= 1;
    scoreEl.textContent = resscore;
  }
});
