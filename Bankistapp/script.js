"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Naveen kumar",
  movements: [430, 1000, 7000, -650, -130, 5000, 90],
  interestRate: 1,
  pin: 1111,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2023-11-08T14:11:59.604Z",
    "2023-11-02T17:01:17.194Z",
    "2023-11-04T23:36:17.929Z",
    "2023-11-05T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "en-IN", //"te-IN"
};

const account2 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 2222,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
};

const account3 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account4 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, 3000, -20, 50, 4000, -460],
  interestRate: 0.7,
  pin: 4444,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  locale: "fr-BE",
};

const account5 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  locale: "pt-PT",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// The insertAdjacentHTML method is a JavaScript method that allows you to insert HTML content into an element
// at a specified position relative to the element. It is commonly used to dynamically add, update, or replace HTML
// content within a webpage. This method is typically called on a DOM element.

//The insertAdjacentHTML method takes two arguments: insertAdjacentHTML(position,text)

const formatAccountDetail = function (date, locale) {
  // calculate days when we posted

  const calcDays = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDays(new Date(), date);
  console.log(daysPassed);

  // display today or yesterday functionolity

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "YesterDay";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// to display the account details
const displayAccountDetails = function (acc, sort = false) {
  const sortingMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  sortingMovements.forEach(function (value, index) {
    const type = value > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[index]);

    const displayDate = formatAccountDetail(date, acc.locale);

    const fomattedMov = formatCur(value, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
       <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
       <div class="movements__value">${fomattedMov}</div>
  </div> 
     `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//displayAccountDetails(account1.movements);

// calculate display summury incomes,outcomes and intrests

const calcDisplaySummury = function (acc) {
  const incomes = acc.movements
    .filter((curr) => curr > 0)
    .reduce((acc, curr) => acc + curr);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements
    .filter((curr) => curr < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );

  const intrest = acc.movements
    .filter((curr) => curr > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, curr) => acc + curr);
  labelSumInterest.textContent = formatCur(intrest, acc.locale, acc.currency);
};

//calcDisplaySummury(account1.movements);

// Calculate and adding balance

const Calculatebalance = function (acc) {
  // creating a new property to the account
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//Calculatebalance(account1.movements);

// creating the usernames with shortcut
const createUserNames = function (accounts) {
  accounts.forEach(function (acc) {
    console.log(acc);
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((first) => first[0])
      .join("");
  });
};
createUserNames(accounts);

// update the ui functionolity
const updateUI = function (acc) {
  // display Movments
  displayAccountDetails(acc);

  // Display balance
  Calculatebalance(acc);

  // display summury
  calcDisplaySummury(acc);
};

// after certain amount it will be logout autometically
const startLOutTimer = function () {
  const tick = function () {
    const minutes = String(Math.floor(time / 60)).padStart(2, 0);
    const seconds = time % 60;
    labelTimer.textContent = `${minutes}: ${seconds}`;
    if (time === 0) {
      clearInterval(timerId);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    time -= 1;
  };

  // set time to 6 min
  let time = 120;
  tick();
  const timerId = setInterval(tick, 1000);
  return timerId;
};

// Event handler implementing login form
let currentAccount, timerId;

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //current date and time
    // const now = new Date(); // day/month/year
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hours = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/ ${month}/ ${year}  ${hours}: ${minutes}`;

    // Internationalizing the above date format
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      //weekday: "long",
    };

    const locale = navigator.language;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // timer
    if (timerId) clearInterval(timerId);
    timerId = startLOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

// transfer amount to another acount.

btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("transferred");
  const amount = inputTransferAmount.value;
  const reciverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount); // withraw amount and transfer to another acc
    reciverAcc.movements.push(amount); // transfer amount is recived

    // add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //reset timer
    clearInterval(timerId);
    timerId = startLOutTimer();
  }
});

// request loan amount
btnLoan.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value); //rounding the number
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1) // the movement is 10% and above(0.1 = 10%)
  ) {
    // setting up time here
    setTimeout(function () {
      // add the movement
      currentAccount.movements.push(amount);

      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //update UI
      updateUI(currentAccount);
      //reset timer
      clearInterval(timerId);
      timerId = startLOutTimer();
    }, 3000);
    inputLoanAmount.value = "";
  }
});

// delete account

btnClose.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // delete account
    accounts.splice(index, 1);
    // Hide uI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener("click", (event) => {
  event.preventDefault();
  displayAccountDetails(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// convert indian rs to us dollars
// 1Rs === 0.012Usd
// const rsToUsd = 0.112;

// const res = movements
//   .filter((each) => each > 0)
//   .map((eachvalue) => eachvalue * rsToUsd)
//   .reduce((acc, curr) => acc + curr);
// console.log(`final ${res}`);

// ***** Array method practices ***** //

// // chaining methods
// const overall = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, curr) => acc + curr);
// console.log(overall);

// // 1. calculate all the movements
// const bankDepositSum = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov > 0)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(bankDepositSum);

// //2. Count how  many deposits there have been in the bank at lest 1000 rs

// const numDeposits = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((acc) => acc > 1000);
// console.log(numDeposits);

// // 3. reduce method adavance case calculate both deposit and withdraw
// const sums = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (acc, curr) => {
//       curr > 0 ? (acc.deposits += curr) : (acc.withdrawals += curr);
//       // acc[curr > 0 ? "deposits" : "withdrawals"] += curr; other way
//       return acc;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(sums);

// // 4. convert any string to title case (first letter to uppercase)

// const convertTitleCase = function (title) {
//   const exceptions = ["a", "an", "or", "and", "but", "on", "in", "with"];
//   const capitalaize = (str) => str[0].toUpperCase() + str.slice(1);

//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((each) => (exceptions.includes(each) ? each : capitalaize(each)))
//     .join(" ");
//   return capitalaize(titleCase);
// };

// console.log(convertTitleCase("this is a title and great learning"));
