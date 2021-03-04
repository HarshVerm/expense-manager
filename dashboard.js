window.addEventListener("load", function () {
  var user = localData("login_user") || "";
  // console.log(user)
  if (user == "") {
    document.body.innerHTML = "<h1>Invalid User<h1>";
  } else {
    fillDashboard(user);
    var transForm = document.getElementById("form");
    transForm.addEventListener("submit", addTransaction);
  }

  var btnLogout = document.getElementById("logout");
  btnLogout.addEventListener("click", logout);

  let btnLedger = document.getElementById("ledger");
  btnLedger.addEventListener("click", function () {
    window.location = "ledger.html";
  });
});

// Global Variable
var arr;
var userDetails = [];
var totalBalance = 0,
  credit = 0,
  debit = 0;
var user = localData("login_user") || "";
var username = "";

//Get users or user from local storage
function localData(key) {
  return JSON.parse(localStorage.getItem(key));
}

// update data in local storage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// update dashboard
function fillDashboard(user) {
  userDetails = [];
  // console.log(user)
  arr = localData("user_register") || [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == user) {
      username = arr[i].name;
      userDetails.push(arr[i]);
      break;
    }
  }
  document.getElementById("user").innerHTML = username;
  // console.log(userDetails[0].transactions.length )
  if (userDetails[0].transactions.length == 0) {
    document.getElementById("income").textContent = "0";
    document.getElementById("expences").textContent = "0";
    document.getElementById("last-transaction").textContent = "No transactions";
  } else {
    var transactions = totalTransactions();
    debit = totalDebit(transactions);
    credit = totalCredit(transactions);
    totalBalance = Number(credit) - Number(debit);
    document.getElementById("income").textContent = credit;
    document.getElementById("expences").textContent = debit;
    document.getElementById("balance").textContent = totalBalance;
    displayTransactions(transactions);
  }
}

// for transaction
function addTransaction() {
  event.preventDefault();
  var form = new FormData(event.target);

  var title = form.get("title");
  var type = form.get("type");
  var amount = Number(form.get("amount"));
  // var timeStamp = new Date()
  var date = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  };
  var timeStamp = new Intl.DateTimeFormat("en-US", options).format(date);
  // console.log(title,type,amount, timeStamp)

  var transaction = {
    title: title,
    type: type,
    amount: amount,
    timestamp: timeStamp,
  };

  console.log("hiiiiiiiiiii");

  if (type == "debit" && amount <= totalBalance) {
    pushLocal(transaction);
    fillDashboard(user);
    document.getElementById("form").reset();
  } else if (type == "credit") {
    pushLocal(transaction);
    fillDashboard(user);
    document.getElementById("form").reset();
  } else {
    document.getElementById("msg").textContent = "Insufficient Balance";
  }
}

// add transaction in local storage
function pushLocal(transaction) {
  arr = localData("user_register") || [];
  // user = localData('login_user') || ""
  // console.log(user)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == user) {
      arr[i].transactions.push(transaction);
      break;
    }
  }
  // console.log(arr)

  saveData("user_register", arr);
}

// get transactions from users detail
function totalTransactions() {
  var transaction;
  arr = localData("user_register") || [];
  // user = localData('login_user') || ""
  // console.log(user)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == user) {
      transaction = arr[i].transactions;
      break;
    }
  }

  return transaction;
}

// count total credit amount
function totalCredit(transactions) {
  var totalCredit = 0;
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].type == "credit") {
      totalCredit += Number(transactions[i].amount);
    }
  }
  return totalCredit;
}

// count total debit amount
function totalDebit(transactions) {
  var totalDebit = 0;
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].type == "debit") {
      totalDebit += Number(transactions[i].amount);
    }
  }
  return totalDebit;
}

// add transactions on window
function displayTransactions(transaction) {
  // console.log(transaction)
  var add = document.getElementById("transactions");
  add.innerHTML = "";

  if (transaction.length >= 5) {
    for (var i = transaction.length - 1; i > transaction.length - 6; i--) {
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML = `Title : ${transaction[i].title} <br>
                            Type : ${transaction[i].type} <br>
                            Amount : ${transaction[i].amount} <br>
                            Time Stamp : ${transaction[i].timestamp} `;

      div.append(p);
      add.append(div);
    }
  } else {
    for (var i = transaction.length - 1; i >= 0; i--) {
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML = `Title : ${transaction[i].title} <br>
                            Type : ${transaction[i].type} <br>
                            Amount : ${transaction[i].amount} <br>
                            Time Stamp : ${transaction[i].timestamp} `;

      div.append(p);
      add.append(div);
    }
  }
}

function logout() {
  saveData("login_user", "");
  window.location = "index.html";
}
