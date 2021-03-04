window.addEventListener("load", function () {
  let loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", getData);

  let registerForm = document.querySelector("#registerForm");
  registerForm.addEventListener("submit", registerUser);

  let btnlogin = document.querySelector("#btn4");
  btnlogin.addEventListener("click", signUpLogin);

  let btnregister = document.querySelector("#btn1");
  btnregister.addEventListener("click", loginSignUp);
});
function localData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function loginSuccess(em) {
  localStorage.setItem("login_user", JSON.stringify(em));
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getData() {
  event.preventDefault();

  var arr = localData("user_register") || [];

  var login = false,
    e = false;
  var form = new FormData(event.target);
  var email = form.get("email");
  var pass = form.get("pass");

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == email) {
      e = true;
    }
    if (arr[i].email == email && arr[i].password == pass) {
      loginSuccess(email);
      login = true;
      window.location = "dashboard.html";
    }
  }
  if (!login) {
    var p = document.getElementById("error_msg");
    if (e) {
      p.textContent = "Wrong Password";
    } else {
      p.textContent = "Account doesn’t exists";
    }
  }
}

function registerUser() {
  event.preventDefault();
  var arr = localData("user_register") || [];

  var form = new FormData(event.target);
  var userName = form.get("name");
  var email = form.get("email");
  var pass = form.get("pass");

  var check = nameCheck(userName);
  if (check) {
    check = emailValidate(email);
  }

  if (check) {
    check = passValidate(pass);
  }
  var valid = true;

  if (check) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].email == email) {
        var err = document.querySelector(".msg1");
        err.textContent = "Email already exist.";
        valid = false;
        setTimeout(function () {
          err.textContent = "";
        }, 5000);
        break;
      }
    }
  }
  if (valid && check) {
    var detail = {
      name: userName,
      email: email,
      password: pass,
      transactions: [],
    };
    arr.push(detail);
    var err = document.querySelector(".msg1");
    err.textContent = "";
    saveData("user_register", arr);
    document.getElementById("registerForm").reset();
    document.querySelector("p").textContent = "";
    setTimeout(function () {
      signUpLogin();
    }, 5000);
  }
}

function nameCheck(user) {
  if (user.length < 4) {
    document.getElementById("errorName").textContent =
      "Username have minimum 4 character";
    return false;
  }

  document.getElementById("errorName").textContent = "";
  return true;
}

function emailValidate(email) {
  let position = email.indexOf("@");
  if (position < 1) {
    document.getElementById("errorEmail").textContent = "Email is not correct";
    return false;
  }

  let point = email.indexOf(".");
  if (point <= position + 2) {
    document.getElementById("errorEmail").textContent = "Email is not correct";
    return false;
  }

  if (point == email.length - 1) {
    document.getElementById("errorEmail").textContent = "Email is not correct";
    return false;
  }
  document.getElementById("errorEmail").textContent = "";
  return true;
}
function passValidate(pass) {
  if (pass.length < 6) {
    document.getElementById("errorPass").textContent =
      "Minimum 6 character in password";
    return false;
  }
  document.getElementById("errorPass").textContent = "";
  return true;
}

function signUpLogin() {
  document.querySelector(".container_2").style.display = "none";
  document.querySelector(".container_1").style.display = "block";
  document.getElementById("registerForm").reset();
  document.getElementById("errorPass").textContent = "";
  document.getElementById("errorEmail").textContent = "";
  document.getElementById("errorName").textContent = "";
  var btn1 = document.querySelector("#btn1");
  btn1.style.cursor = "pointer";
  btn1.style.background = "white";
  var btn2 = document.querySelector("#btn2");
  btn2.style.cursor = "default";
  btn2.style.background = "rgba(255, 255, 255, 0.671)";

  document.title = "LogIn";
}

function loginSignUp() {
  document.querySelector(".container_2").style.display = "block";
  document.querySelector(".container_1").style.display = "none";
  document.querySelector("#btn4").style.cursor = "pointer";
  document.querySelector("#btn3").style.cursor = "default";
  document.getElementById("loginForm").reset();
  document.title = "SignUp";
}
