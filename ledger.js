var t,
  username = "";

window.addEventListener("load", function () {
  var user = localData("login_user") || "";

  if (user == "") {
    document.body.innerHTML = "<h1>Invalid User<h1>";
  } else {
    displayAllTransaction(user);
  }
  var allTransaction = document.getElementById("all");
  allTransaction.addEventListener("click", function () {
    displayAllTransaction(user);
  });
  var debit = document.getElementById("debit");
  debit.addEventListener("click", displayDebit);

  var credit = document.getElementById("credit");
  credit.addEventListener("click", displayCredit);

  var dash = document.getElementById("dash");
  dash.addEventListener("click", function () {
    window.location = "dashboard.html";
  });

  var logout = document.getElementById("logout");
  logout.addEventListener("click", function () {
    saveData("login_user", "");
    window.location = "index.html";
  });
});

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function displayAllTransaction(user) {
  var allUser = localData("user_register");

  var transaction;

  for (var i = 0; i < allUser.length; i++) {
    if (allUser[i].email == user) {
      username = allUser[i].name;
      transaction = allUser[i].transactions;
      break;
    }
  }
  // console.log(transaction)
  t = transaction;

  if (transaction.length == 0) {
    document.getElementById("results").innerHTML = "No Transactions";
  } else {
    var div = document.getElementById("results");

    for (var i = 0; i < transaction.length; i++) {
      var p = document.createElement("p");
      p.innerHTML = `Title : ${transaction[i].title} <br>
                Type : ${transaction[i].type} <br>
                Amount : ${transaction[i].amount} <br>
                TimeStamp : ${transaction[i].timestamp}<br>`;

      div.append(p);
    }
  }
  document.getElementById("user").innerHTML = username;
}

function displayDebit() {
  //  console.log(t)
  if (t.length == 0) {
    document.getElementById("results").innerHTML = "No Transactions";
  } else {
    var div = document.getElementById("results");
    div.innerHTML = "";

    for (var i = 0; i < t.length; i++) {
      if (t[i].type == "debit") {
        var p = document.createElement("p");
        p.innerHTML = `Title : ${t[i].title} <br>
                    Type : ${t[i].type} <br>
                    Amount : ${t[i].amount} <br>
                    TimeStamp : ${t[i].timestamp}<br>`;

        div.append(p);
      }
    }
  }
}
function displayCredit() {
  //  console.log(t)
  if (t.length == 0) {
    document.getElementById("results").innerHTML = "No Transactions";
  } else {
    var div = document.getElementById("results");
    div.innerHTML = "";

    for (var i = 0; i < t.length; i++) {
      if (t[i].type == "credit") {
        var p = document.createElement("p");
        p.innerHTML = `Title : ${t[i].title} <br>
                    Type : ${t[i].type} <br>
                    Amount : ${t[i].amount} <br>
                    TimeStamp : ${t[i].timestamp}<br>`;

        div.append(p);
      }
    }
  }
}

// {title: "Salary", type: "credit", amount: 10000, timestamp: "Saturday, October 17, 2020, 12:14:35 PM GMT+5:30"}
