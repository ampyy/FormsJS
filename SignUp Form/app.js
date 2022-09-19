// Variables for DOM manipulation
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#psw");
const cpassword = document.querySelector("#psw-repeat");
const showPassword = document.querySelector("#show-password");
const passwordMessage = document.querySelector("#psw-message");
const cpasswordMessage = document.querySelector("#cpsw-message");
const submitBtn = document.querySelector("#submit-btn");

// Variables for Submit Button Verification
let usernameVerified = false;
let emailVerified = false;
let passwordVerified = false;
let cpasswordVerified = false;

// Utility Funtions
// Email Validation Function
function ValidateEmail(input) {
  var validRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

//Password Validation Function
function validatePassword(password) {
  var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (password.value.match(passw)) {
    return true;
  } else {
    return false;
  }
}

// Toggle password Functionality
showPassword.addEventListener("click", function (e) {
  if (showPassword.classList.contains("fa-eye-slash")) {
    password.type = "password";
    cpassword.type = "password";
    showPassword.classList.remove("fa-eye-slash");
  } else {
    showPassword.classList.add("fa-eye-slash");
    cpassword.type = "text";
    password.type = "text";
  }
});

// Password Confirmation Function
function checkPassword(psw1, psw2) {
  if (psw1 != psw2) {
    change(
      cpassword,
      cpasswordMessage,
      "red",
      "Password not Matching",
      "block"
    );
    return false;
  } else {
    change(cpassword, cpasswordMessage, "green", "", "none");
    return true;
  }
}

// To change the color and innerText of labels
function change(element, elementMessage, color, msg, display) {
  element.style.border = "2px solid " + color;
  elementMessage.innerText = msg;
  elementMessage.style.display = display;
  elementMessage.style.color = color;
}

// Input checking functions to validate and display messages while taking input
// Username Event Handling
username.addEventListener("input", function (e) {
  const usernameMessage = document.querySelector("#username-message");
  if (username.value.length < 4 || username.value.length > 25) {
    usernameVerified = false;
    change(
      username,
      usernameMessage,
      "red",
      "Username must be 3 to 25 characters long.",
      "block"
    );
  } else {
    usernameVerified = true;
    change(username, usernameMessage, "green", "", "none");
  }
});

// Email Event Handling
email.addEventListener("input", function (e) {
  const emailMessage = document.querySelector("#email-message");
  if (ValidateEmail(email)) {
    emailVerified = true;
    change(email, emailMessage, "green", "", "none");
  } else {
    emailVerified = false;
    change(
      email,
      emailMessage,
      "red",
      "Invalid Email. It should contain @ and .",
      "block"
    );
  }
});

// Password Checking
password.addEventListener("input", function () {
  if (validatePassword(password)) {
    passwordVerified = true;
    change(password, passwordMessage, "green", "", "none");
    checkPassword(password.value, cpassword.value);
  } else {
    passwordVerified = false;
    change(
      password,
      passwordMessage,
      "red",
      "Password should be 8 characters long and should contain one UpperCase, one LowerCase, one Numeric and one Special Character.",
      "block"
    );
    checkPassword(password.value, cpassword.value);
  }
});

// Validating the password and confirm password
cpassword.addEventListener("input", function () {
  if (checkPassword(password.value, cpassword.value)) {
    cpasswordVerified = true;
  } else {
    cpasswordVerified = false;
  }
});

// Submit Button Event
submitBtn.addEventListener("click", function (e) {
  console.log(
    usernameVerified,
    emailVerified,
    passwordVerified,
    cpasswordVerified
  );
  e.preventDefault();
  if (
    usernameVerified &&
    emailVerified &&
    passwordVerified &&
    cpasswordVerified
  ) {
    modalContainer.style.display = "block";
  } else {
    alert("Error");
  }
});

// Modal Logic to Say Signed Up
let closeBtn = document.querySelector("#close-btn");
let modalContainer = document.querySelector("#modal-container");

closeBtn.addEventListener("click", function () {
  modalContainer.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});
