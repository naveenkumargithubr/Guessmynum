"use strict";

const btnShowModel = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

// to show the model when the btn is clicked
const showModel = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// to close the model when the btn is closed
const closeModel = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// iterate over the btns with same class names
for (let i = 0; i < btnShowModel.length; i++)
  btnShowModel[i].addEventListener("click", showModel);

// add event listeners to the btns
btnCloseModal.addEventListener("click", closeModel);
overlay.addEventListener("click", closeModel);
