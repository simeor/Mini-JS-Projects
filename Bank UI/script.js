'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const displayMovments = (movements, sort = false) => {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">£${movement}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

let sorted = false;
// btn sort click
btnSort.addEventListener('click', (e) => {
  displayMovments(currentAccount.movements, !sorted);
  sorted = !sorted;
})



const createUsername = (acc) => { acc.forEach( acc => acc.username =
  acc.owner.toLowerCase().split(" ").map(name => name[0]).join(""));
}
createUsername(accounts);


const calcPrintBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `£${acc.balance}`;
}



// display summery

const calcDisplaySummary = (movements) => {
  const incomes = movements.filter(item => item > 0).reduce((acc,item) => (acc + item),0);
  labelSumIn.textContent = `£${incomes}`;

  const out = movements.filter(item => item < 0).reduce((acc,item) => (acc + item),0);
  labelSumOut.textContent = `£${Math.abs(out)}`;

  // intrest of 1.2 for each deposit
  const intrest = movements.filter(item => item > 0).map(item => item * 1.2 / 100).reduce((acc,item) => (acc + item),0);
  labelSumInterest.textContent = `£${intrest}`;

}



let currentAccount;
// event handle
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display on ui welcome
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = "100";
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

const updateUI = (currentAccount) => {
  // display movments
    displayMovments(currentAccount.movements);
    //display balance
    calcPrintBalance(currentAccount);
    // display summery
    calcDisplaySummary(currentAccount.movements);

}


// transfer money

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // valid transfer
  if(amount > 0 && currentAccount.balance >= amount && reciverAcc.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});


// request a lone if atleast one deposit with 10% of req loan maount
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = "";
  }
})


// delete an account
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex( acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});




/////////////////////////////////////////////////
/////////////////////////////////////////////////


// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(Math.max(...movements))

// (movements.map(item => item * 1.1))

// console.log(movements.reduce((acc,item) => acc + item))

// for (const movment of movements ){
//   if(movment > 0) console.log(`deposited ${movment}`)
// }

// movements.forEach( item => {if(item > 0) console.log(item)})

// movements.forEach((item, index) => console.log(index,item))

